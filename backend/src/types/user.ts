import {Document, Model} from 'mongoose';
import {ObjectId, RequestIP} from './utils';

import {Enums} from '.';
import {Request} from 'express';

export interface IAuthRequest extends Request {
	ipinfo?: RequestIP;
	body: {
		user: IUserBody;
		device: Enums.Devices;
	}

}
export interface IUser {
	country: string;
	device: Enums.Devices;
	username: string;
	avatar: string;
	scrapies: ObjectId[]
	uId: string;
	lastActivity: Date;
	ip: string;
}

export type IUserBody = Pick<IUser, 'username' | 'device'>;

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
