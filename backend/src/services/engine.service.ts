import {E, Enums} from '@/types';

import {ApiError} from '@/middlewares/errors';
import {Queries} from './queries';
import {Users} from '.';
import moment from 'moment';
import {nanoid} from 'nanoid';
import schedule from './jobs/emitter';

export const getService = (url: string): Enums.Services => {
	for (const key in Enums.SupportedDomains) {
		if (url.includes(Enums.SupportedDomains[key as Enums.Services])) {
			return (Enums.Services as any)[key];
		}
	}
	return Enums.Services.UNKNOWN;
};

export const startByService = async (userPayload: E.UserPayload) => {
	const service = getService(userPayload.link);
	if (service === Enums.Services.UNKNOWN) {
		throw new ApiError(400, 'Unknown Service.');
	}

	const taskId = nanoid(10);
	let Payload: E.StartPayload = {
		...userPayload,
		service,
		operationId: taskId,
		expiresAt: moment().add(1, 'day').toDate(),
		status: Enums.Status.PENDING,
		progress: 0,
		progressMessage: ''
	};
	if (service === Enums.Services.AKOAM) {
		await schedule.StartByAkoam(Payload, taskId);
	}
	// Create a New Scrapy
	const Scrapy = await Queries.createNewScrapy(Payload);
	await Users.PushScrapy(Scrapy.user, Scrapy._id);

	return Scrapy;
};
