import {NextFunction, Request, Response} from 'express';

import {ApiError} from './errors';
import _ from 'underscore';
import jsonwebtoken from 'jsonwebtoken';
import {vars} from '@/config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const bearerHeader = req.headers['authorization'];
		if (!bearerHeader) {
			throw new ApiError(401, 'Token invalid');
		}
		const bearer = bearerHeader.split(' ');
		const token = bearer[1];
		const payload = jsonwebtoken.verify(token, vars.jwt.auth);
		req.body = {
			...req.body,
			user: _.pick(payload, ['uId', 'username'])
		};
		next();
	} catch (error) {
		console.log('🚀 ~ verifyToken ~ error:', error);
		throw new ApiError(401, 'Token invalid');
	}
};
