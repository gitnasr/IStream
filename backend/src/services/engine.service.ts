import {E, Enums} from '@/types';
import {Job, Queue, Worker} from 'bullmq';

import {ApiError} from '@/middlewares/errors';
import {Queries} from './queries';
import RedisService from './redis';
import {Users} from '.';
import moment from 'moment';
import {nanoid} from 'nanoid';

const Redis = new RedisService();
export const getService = (url: string): Enums.Services => {
	for (const key in Enums.SupportedDomains) {
		if (url.includes(Enums.SupportedDomains[key as Enums.Services])) {
			return (Enums.Services as any)[key];
		}
	}
	return Enums.Services.UNKNOWN;
};

export const startByService = async (StartParams: E.InfoResponse, start: Function) => {
	console.log('🚀 ~ startByService ~ StartParams:', StartParams);
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
				try {
					const {data} = job;
					console.log('🚀 ~ startByService ~ data:', data);
					const res = await start(data.operationId, data.episodes, data.quality);
					return res;
				} catch (error) {
					console.log('🚀 ~ startByService ~ error:', error);
					throw error;
				}
			},
			{connection: Redis.client}
		);
		await Q.add(taskId, Payload, {jobId: taskId, removeOnComplete: false, removeOnFail: false});
		// Create a New Scrapy
		const Scrapy = await Queries.createNewScrapy(Payload);
        Users.PushScrapy(Scrapy.user, Scrapy._id);
		W.on("failed", async (err) => {
			console.log('🚀 ~ startByService ~ err:', err)
			await Queries.updateStatus(Scrapy._id, Enums.Status.FAILED);
		})
		return Scrapy
	}
};
