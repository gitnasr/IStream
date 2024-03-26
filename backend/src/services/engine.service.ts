import {E, Enums} from '@/types';
import {Job, Queue, Worker} from 'bullmq';

import {ApiError} from '@/middlewares/errors';
import {Queries} from './queries';
import RedisService from './redis';
import {Users} from '.';
import moment from 'moment';
import {nanoid} from 'nanoid';

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
	const Q = new Queue(service, {connection: Redis.client});

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
			service,
			async (job: Job) => {
				const {data} = job;

				try {
					const res = await start(data.operationId, data.episodes, data.quality);
					return res;
				} catch (error) {
					await Queries.updateStatus(data.operationId, Enums.Status.FAILED);
					throw error;
				}
			},
			{connection: Redis.client, concurrency: 1, runRetryDelay: 1000}
		);
		await Q.add(taskId, Payload, {jobId: taskId, removeOnComplete: false, removeOnFail: false, attempts: 3});
		// Create a New Scrapy
		const Scrapy = await Queries.createNewScrapy(Payload);
		await Users.PushScrapy(Scrapy.user, Scrapy._id);

		return Scrapy;
	}
};
