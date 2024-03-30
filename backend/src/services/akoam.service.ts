import {Cookie, CookieJar} from 'tough-cookie';
import {Enums, R, S} from '@/types';

import Axios from './axios';
import {CaptchaService} from '.';
import Dommer from '@/utils/cheerio';
import {Queries} from './queries';
import RedisService from './redis';
import Utils from './utils';
import moment from 'moment';
import {wrapper} from 'axios-cookiejar-support';

export const AKOAM = {
	domain: 'https://ak.sv',
	episodes: '.entry-date',
	poster: '.col-lg-3, col-md-4 text-center mb-5 mb-md-0',
	logo: 'https://ak.sv/style/assets/images/logo-white.svg',
	episodes_grid: 'div.col-md-auto, text-center pb-3 pb-md-0',
	short_links_grid: 'a.link-btn, link-download d-flex align-items-center px-3',
	protected_div: '.download-link',
	verify_link: 'https://ak.sv/verify',
	validation_title: 'تحقق | اكوام'
};
export const getInfo = async (uri: string): Promise<S.InfoResponse> => {
	const axios = new Axios();
	const res = await axios.get<string>(uri);
	if (res.status !== 200) {
		throw new Error('Error getInfo');
	}
	const dom = new Dommer(res.data);
	const title = dom.getTitle().split('|')[0].trim();
	const episodes_count = dom.getElementLength(AKOAM.episodes);
	const poster = dom.getImageByClassName(AKOAM.poster);
	const story: string = dom.getFirstByTag('p');
	const episodes = dom.getArrayByTag(AKOAM.episodes_grid).map(episode => {
		return episode.attribs.href;
	});
	return {title, episodes_count, poster, story, logo: AKOAM.logo, episodes};
};

export const Start = async (jobId: string, episodes: string[], quality = '1080') => {
	if (episodes.length === 0) {
		await Queries.updateJobProgress(jobId, 100, 'No Episodes Found');
		await Queries.updateStatus(jobId, Enums.Status.FAILED);
		throw new Error('No Episodes Found');
	}
	const startedAt = moment();
	await Queries.updateStatus(jobId, Enums.Status.PROCESSING);

	const short_links = await getShortLinks(episodes);
	const protected_links = await getProtectedCaptchaLinks(short_links);
	const cookies = await captchaHandler(protected_links[0]);
	if (!cookies) {
		return await Queries.updateJobProgress(jobId, 100, 'Failed to Solve Captcha.');
	}
	const download_links = await getDownloadLinks(protected_links, cookies, quality);
	const timeTaken = moment().diff(startedAt, 'milliseconds');

	if (download_links.length === 0) {
		await Queries.updateJobProgress(jobId, 100, 'No Download Links Found');
		await Queries.updateStatus(jobId, Enums.Status.FAILED);
		throw new Error('No Download Links Found');
	}
	await Queries.updateJobProgress(jobId, 0, 'Getting Estimated Size');
	const {bytes, BytesAsText} = await Utils.getSize(download_links);

	const Payload: R.Create = {
		ScrapyId: jobId,
		Links: download_links,
		count: download_links.length,
		size: BytesAsText,
		session: cookies,
		timeTaken: timeTaken,
		sizeInBytes: bytes
	};
	await Queries.updateStatus(jobId, Enums.Status.SUCCESS);
	const result = await Queries.createResult(Payload);
	await Queries.updateScrapyById(jobId, {result: result._id, progress: 100, progressMessage: 'Done'});

    return result;
};

const getShortLinks = async (uris: string[]) => {
	const axios = new Axios();

	const short_links = [];
	let current = 0;
	for (const uri of uris) {
		current++;
		const res = await axios.get<string>(uri);
		if (res.status !== 200) {
			throw new Error('Error getShortLinks');
		}
		const dom = new Dommer(res.data);
		const short_link = dom.getAttrByTag(AKOAM.short_links_grid).href;
		short_links.push(short_link);
	}

	return short_links;
};

const getProtectedCaptchaLinks = async (shortLinks: string[]) => {
	const axios = new Axios();

	const protected_links = [];
	let current = 0;
	for (const uri of shortLinks) {
		current++;
		const res = await axios.get<string>(uri);
		if (res.status !== 200) {
			throw new Error('Error getProtectedCaptchaLinks');
		}
		const dom = new Dommer(res.data);
		const link = dom.getAttrByTag(AKOAM.protected_div).href;
		protected_links.push(link);
	}
	return protected_links;
};

const captchaHandler = async (uri: string): Promise<string | undefined> => {
	const axios = new Axios();
	let isCaptcha = true;
	// 1. Check if page has captcha -hope that they removed it any time-
	const res = await axios.get<string>(uri);
	if (res.status !== 200) {
		throw new Error('Error');
	}
	const dom = new Dommer(res.data);
	const title = dom.getTitle();
	if (title.includes(AKOAM.validation_title)) {
		isCaptcha = true;
	} else {
		isCaptcha = false;
	}

	// 2. If it has captcha, solve it
	if (isCaptcha) {
		
		// 2.1. Check if stored cookie in Redis
		const cookie = await RedisService.get('captcha_cookie');
		if (cookie) {
			// 2.2. If found, Parse it
			const cookiesAsString = Utils.parseCookiesAsString(JSON.parse(cookie));
			// 2.3. Validate cookie
			const isValid = await validateCookie(uri, cookiesAsString);
			if (isValid) {
				return cookiesAsString;
			} else {
				// Remove invalid cookie from Redis and continue
				await RedisService.del('captcha_cookie');
			}
		}
		// 2.3. If not, solve captcha
		const siteKey = dom.getSiteKey();
		if (!siteKey) throw new Error('Captcha not found');
		// 2.2. Solve captcha
		const captcha = new CaptchaService(siteKey, uri);
		const response = await captcha.solve();
		// 2.3. Use verify
		const cookies = await useVerify(response.data);
		if (!cookies) throw new Error('No Cookies Found! ');
		// 2.4. Store cookie in Redis
		const oneMonth = moment().add(1, 'months')
		const differenceInMilliseconds = oneMonth.diff(moment());
	  
		const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
	  
		await RedisService.setEx('captcha_cookie', JSON.stringify(cookies), differenceInSeconds);
		// 2.5. Parse cookies
		return Utils.parseCookiesAsString(cookies);
	}
};

const validateCookie = async (test_uri: string, cookies: string) => {
	console.log("🚀 ~ validateCookie ~ cookies:", cookies)
	const axios = new Axios();
	const {data} = await axios.get<string>(test_uri, {headers: {Cookie: cookies}});
	const dom = new Dommer(data);
	const title = dom.getTitle();
	console.log("🚀 ~ validateCookie ~ title:", title)
	return !title.includes(AKOAM.validation_title);
};

const useVerify = async (captcha_response: string): Promise<Cookie[] | undefined> => {
	const jar = new CookieJar();
	const axios = wrapper(new Axios(jar).axiosInstance);
	const res = await axios.post<void>(AKOAM.verify_link, {'g-recaptcha-response': captcha_response}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
	const cookies = res.config.jar?.getCookies(AKOAM.domain);

	return cookies;
};
const getDownloadLinks = async (protected_links: string[], cookies: string, quality: string): Promise<string[]> => {
	const axios = new Axios();

	const download_links: string[] = [];
	let current = 0;
	for (const uri of protected_links) {
		current++;
		const res = await axios.get<string>(uri, {headers: {Cookie: cookies}});
		const dom = new Dommer(res.data);
		const VideoSources = dom.getVideoSource();
		let Download = '';
		if (VideoSources) {
			// 1. Find By Quality
			const SelectedQuality = quality;
			const SourceByQuality = VideoSources.find(source => source.attribs.size === SelectedQuality) || VideoSources[0];
			if (SourceByQuality) {
				Download = SourceByQuality.attribs.src;
			} else {
				Download = VideoSources[0].attribs.src;
			}
		}
		download_links.push(Download);
	}
	return download_links;
};
