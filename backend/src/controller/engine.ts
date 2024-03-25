import {AkoamService, Engine, Queries} from '@/services';
import {E, Enums} from '@/types';
import {Request, Response} from 'express';

import {ApiError} from '@/middlewares/errors';
import {catchAsync} from '@/utils';
import moment from 'moment';

export const Start = catchAsync(async (req: Request, res: Response) => {
	const {link, q, user, source} = req.body;
	const getService = Engine.getService(link);
	if (getService === Enums.Services.UNKNOWN) throw new ApiError(400, 'Unknown Service.');
	let StartParams: E.InfoResponse = {
		link,
		user: user.uId,
		source,
		quality: q,
		episodes: []
	};
	switch (getService) {
		case Enums.Services.AKOAM:
			const episode_info = await AkoamService.getInfo(link);
			if (!episode_info) throw new ApiError(500, 'Failed to get episode info');
			StartParams = Object.assign(StartParams, episode_info);
			const scrapy = await Engine.startByService(StartParams, AkoamService.Start);
			return res.status(200).send(scrapy);
		default:
			throw new ApiError(400, 'Unknown Service.');
	}
});

export const Track = catchAsync(async (req: Request, res: Response) => {
	const {action} = req.params;
	const {id} = req.query;
	const oId = id?.toString() || '';

	switch (action) {
		case 'DOWNLOAD':
			await Queries.updateResultByOperationId(oId, {
				isDownloaded: {
					date: moment().toDate(),
					message: 'Downloaded by User',
					status: true
				}
			});
			break;
		case 'COPY':
			await Queries.updateResultByOperationId(oId, {
				isCopied: {
					date: moment().toDate(),
					message: 'Copied by User',
					status: true
				}
			});
			break;
		case 'VIEW':
			await Queries.updateViews(oId);
			break;
		default:
			throw new ApiError(400, 'Unknown Action');
	}
	res.status(200).send('Success');
});

export const Status = catchAsync(async (req: Request, res: Response) => {
	const {id} = req.query;
	const status = await Queries.getScrapyByOperationId(id?.toString() || '', ['result']);
	if (!status) {
		throw new ApiError(404, 'Invalid ID Provided');
	}
	res.status(200).send(status);
});

export const Result = catchAsync(async (req: Request, res: Response) => {
	const {id} = req.query;
	const status = await Queries.getResultsByOperationId(id?.toString() || '');
	if (!status) {
		throw new ApiError(404, 'No Results Found');
	}
	res.status(200).send(status);
});
