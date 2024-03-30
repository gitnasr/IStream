import mongoose from 'mongoose';

const LogsSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		timestamp: {
			type: Date,
			required: true
		},

		trace: {
			type: String
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);


export const Logs = mongoose.model('Logs', LogsSchema);