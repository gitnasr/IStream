import {Document, Model} from 'mongoose';

interface IS {
	status: boolean;
	message: string;
	date: Date | null;
}
export interface IResult {
	ScrapyId: string;
	Links: string[];
	isDownloaded: IS;
	isCopied: IS;
	views: number;
	session: string;
	isProcessed: boolean;
	timeTaken: number;
	count: number;
	size: string;
	sizeInBytes: number;
}

export type Create = Partial<IResult>;

export interface IResultDocument extends IResult, Document {}
export interface IResultModel extends Model<IResultDocument> {}
