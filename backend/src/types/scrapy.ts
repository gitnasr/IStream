import {Document, Model, Schema} from 'mongoose';

import {Enums} from '.';
import { ObjectId } from './utils';

export interface IScrapy {
	title: string;
	service: Enums.Services;
	story: string;
	poster: string;
	status: Enums.Status;
	user: ObjectId;
	operationId: string;
	quality: Enums.Quality;
	expiresAt: Date;
	source: Enums.Sources;
	result?: Schema.Types.ObjectId;
    logo: string;
    link: string
    episodes_count: number
	progress: number
	progressMessage: string
}
export interface InfoResponse {
	episodes: string[];
	story: string;
	poster: string;
	title: string;
	episodes_count: number;
	logo: string;
	
}
export interface IScrapyDocument extends IScrapy, Document {}
export interface IScrapyModel extends Model<IScrapyDocument> {}

