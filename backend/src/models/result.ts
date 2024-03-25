import {R} from '@/types';
import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema<R.IResultDocument, R.IResultModel>(
	{
		ScrapyId: String,
		Links: {
			type: [],
			default: []
		},
		count: Number,
		size: String,
		sizeInBytes: Number,
		isDownloaded: {
			type: Object,
			default: {
				status: false,
				message: 'Not Downloaded Yet',
				date: null
			}
		},
		isCopied: {
			type: Object,
			default: {
				status: false,
				message: 'Not Copied Yet',
				date: null
			}
		},
		views: {
			type: Number,
			default: 0
		},
		session: {
			type: String,
			default: '',
			select: false
		},
		isProcessed: {
			type: Boolean,
			default: false
		},
		timeTaken: {
			type: Number,
			default: 0.0
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export const Result = mongoose.model<R.IResultDocument, R.IResultModel>('Result', ResultSchema);

