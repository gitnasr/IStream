import Redis, { RedisOptions } from 'ioredis';

import {vars} from '@/config';

class RedisService {
	private redis: Redis;
	constructor() {
		this.redis = new Redis(vars.redis.url,{maxRetriesPerRequest: null,});
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
