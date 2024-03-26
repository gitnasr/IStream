import {E, Enums} from '@/types';
import {Job, Worker} from 'bullmq';

import {ApiError} from '@/middlewares/errors';
import {Queries} from './queries';
import RedisService from './redis';
import {Users} from '.';
import {addJobToQueue} from './jobs';
import moment from 'moment';
import {nanoid} from 'nanoid';
import {vars} from '@/config';

export const getService = (url: string): Enums.Services => {
	for (const key in Enums.SupportedDomains) {
		if (url.includes(Enums.SupportedDomains[key as Enums.Services])) {
			return (Enums.Services as any)[key];
		}
	}
	return Enums.Services.UNKNOWN;
};

export const startByService = async (StartParams: E.InfoResponse, start: Function) => {
	const Redis = new RedisService();
	const service = getService(StartParams.link!);
	if (service === Enums.Services.UNKNOWN) {
		throw new ApiError(400, 'Unknown Service.');
	}

	const taskId = nanoid(10);
	let Payload: E.InfoResponse = {
		...StartParams,
		service,
		operationId: taskId,
		expiresAt: moment().add(1, 'day').toDate(),
		status: Enums.Status.PENDING
	};
	if (service === Enums.Services.AKOAM) {
		const W = new Worker(
			'AEBOT',
			async (job: Job) => {
				try {
					const {data} = job;
					const res = await start(data.operationId, data.episodes, data.quality);
					return res;
				} catch (error) {
					throw error;
				}
			},
			{connection: {
				host: vars.redis.host,
				port: vars.redis.port,
				password: vars.redis.password
			}, concurrency: 2, runRetryDelay: 1000}
		);

		const job = await addJobToQueue(Payload, taskId);

		// Create a New Scrapy
		const Scrapy = await Queries.createNewScrapy(Payload);
		await Users.PushScrapy(Scrapy.user, Scrapy._id);
		W.on('failed', async err => {
			console.log('🚀 ~ startByService ~ err:', err);
			await Queries.updateStatus(Scrapy._id, Enums.Status.FAILED);
		});
		return Scrapy;
	}
};
