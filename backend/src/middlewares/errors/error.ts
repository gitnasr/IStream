/* eslint-disable @typescript-eslint/no-unused-vars */

import {NextFunction, Request, Response} from 'express';
import {logger, vars} from '@/config';

import ApiError from './ApiError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

export const errorConverter = (err: any, _req: Request, _res: Response, next: NextFunction) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
		const message: string = error.message || `${httpStatus[statusCode]}`;
		error = new ApiError(statusCode, message, false, err.stack);
	}
	next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
	let {statusCode, message} = err;
	if (vars.env === 'production' && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = 'Internal Server Error';
	}

	res.locals['errorMessage'] = err.message;

	const response = {
		code: statusCode,
		message,
		...(vars.env === 'development' && {
			stack: err.stack
		})
	};

	if (vars.env === 'development') {
		logger.error(err);
	}

	res.status(statusCode).send(response);
};
