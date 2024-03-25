import {ApiError} from '@/middlewares/errors';
import {M} from '@/types';
import {Response} from 'express';
import {Users} from '@/services';
import {catchAsync} from '@/utils';
import {generateUsername} from 'unique-username-generator';
import {nanoid} from 'nanoid';

export const NewUser = catchAsync(async (request: M.IAuthRequest, response: Response) => {
	const {device} = request.body;
	const country = request?.ipinfo?.country || 'Unknown';
	const ip = request?.ipinfo?.ip || 'Unknown';
	const username = generateUsername();
	const avatar = `https://ui-avatars.com/api/?name=${username}&size=512&background=random`;
	const uId = nanoid(10);
	const newUser = await Users.create({
		uId,
		ip,
		device,
		country,
		username,
		avatar,
		scrapies: [],
		lastActivity: new Date()
	});
	return response.status(201).json({user: newUser, token: Users.getToken(newUser._id, username)});
});

export const GetMe = catchAsync(async (request: M.IAuthRequest, response: Response) => {
	const {user} = request.body;
	const userDoc = await Users.getOne({username: user.username}, )
	if (!userDoc) throw new ApiError(404, 'User not found');
	const newToken = Users.getToken(userDoc._id, user.username)
	return response.status(200).json({user: userDoc, token: newToken});
});
