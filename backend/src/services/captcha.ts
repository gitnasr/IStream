import {Solver} from '2captcha';
import {vars} from '@/config';

interface CaptchaAnswer {
	data: string;
	id: string;
}
class CaptchaHandler {
	private apiKey: string;
	private engine: Solver;
	private siteKey: string;
	private pageUrl: string;
	constructor(siteKey: string, uri: string) {
		this.apiKey = vars.captcha;
		this.engine = new Solver(this.apiKey);
		this.siteKey = siteKey;
		this.pageUrl = uri;
	}
	async solve(): Promise<CaptchaAnswer> {
		return this.engine.recaptcha(this.siteKey, this.pageUrl);
	}
}

export default CaptchaHandler;
