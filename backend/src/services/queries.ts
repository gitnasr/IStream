import {E, Enums, R, S} from '@/types';
import {Result, Scrapy} from '@/models';

export abstract class Queries {
	static Scrapy = Scrapy;
	static Result = Result;

	static updateJobProgress(id: string, per: number, message: string): Promise<S.IScrapyDocument | null> {
		return this.Scrapy.findOneAndUpdate({operationId: id}, {progress: per, progressMessage: message}, {new: true});
	}

	static createResult(data: R.Create): Promise<R.IResultDocument> {
		return this.Result.create(data);
	}
	static async updateResultByOperationId(operationId: string, payload: Partial<R.Create>): Promise<R.IResultDocument | null> {
		return this.Result.findOneAndUpdate(
			{
				ScrapyId: operationId
			},
			payload,
			{new: true}
		);
	}
	static getResultsByOperationId(operationId: string): Promise<R.IResultDocument | null> {
		return this.Result.findOne({ScrapyId: operationId});
	}
	static async createNewScrapy(payload: E.InfoResponse): Promise<S.IScrapyDocument> {
		return this.Scrapy.create(payload);
	}
	static async getScrapyById(id: string): Promise<S.IScrapyDocument | null> {
		return this.Scrapy.findById(id);
	}
	static async getScrapyByOperationId(operationId: string, populate: string[]): Promise<S.IScrapyDocument | null> {
		return this.Scrapy.findOne({operationId}).populate(populate);
	}
	static async updateScrapyById(operationId: string, payload: Partial<E.InfoResponse>): Promise<S.IScrapyDocument | null> {
		return this.Scrapy.findOneAndUpdate({operationId}, payload, {new: true});
	}
	static async updateStatus(id: string, status: Enums.Status): Promise<S.IScrapyDocument | null> {
		return this.Scrapy.findOneAndUpdate(
			{operationId: id},
			{
				status
			},
			{new: true}
		);
	}
	static updateViews(operationId: string) {
		return this.Result.findOneAndUpdate(
			{
				ScrapyId: operationId
			},
			{
				$inc: {views: 1}
			},
			{new: true}
		);
	}
}
