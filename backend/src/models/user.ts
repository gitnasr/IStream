import {Enums, M} from '@/types';
import {Schema, model} from 'mongoose';

const UserSchema = new Schema<M.IUserDocument, M.IUserModel>(
	{
		avatar: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true,
			default: 'UNKNOWN'
		},
		device: {
			type: String,
			required: true,
			enum: Enums.Devices
		},
		ip: {
			type: String,
			required: true
		},
		uId: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		lastActivity: {
			type: Date,
			required: true,
			default: new Date()
		},
		scrapies: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Scrapy',
				default: []
			}
		]
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export const User = model<M.IUserDocument, M.IUserModel>('User', UserSchema);
