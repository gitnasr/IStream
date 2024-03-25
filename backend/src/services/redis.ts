import Redis, { RedisOptions } from 'ioredis';

import {vars} from '@/config';

class RedisService {
	private redis: Redis;
	constructor() {
		this.redis = new Redis(vars.redis.url,{maxRetriesPerRequest: null,});
	}
	public getConnectionForBull() {
		const client = new Redis(vars.redis.url);
		const subscriber = new Redis(vars.redis.url);
		const opts = {
			// redisOpts here will contain at least a property of
			// connectionName which will identify the queue based on its name
			createClient: function (type:string, redisOpts: RedisOptions) {
			  switch (type) {
				case "client":
				  return client;
				case "subscriber":
				  return subscriber;
				case "bclient":
				  return new Redis(vars.redis.url, redisOpts);
				default:
				  throw new Error("Unexpected connection type: ");
			  }
			},
		  };

		  return opts;
	}
	public async set(key: string, value: string, expiration: number) {
		await this.redis.set(key, value, 'EX', expiration);
	}
	public async get(key: string) {
		return await this.redis.get(key);
	}
	public async delete(key: string) {
		await this.redis.del(key);
	}
	get client() {
		return this.redis;
	}
}

export default RedisService;
