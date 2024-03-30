import {Redis} from 'ioredis';
import {vars} from '@/config';

class RedisService {
    client: Redis;
    constructor() {
        this.client = new Redis(vars.redis.url, {maxRetriesPerRequest: null, });
    }
    async get(key: string) {
        return this.client.get(key);
    }

    async set(key: string, value: string) {
        return this.client.set(key, value);
    }
    async del(key: string) {
        return this.client.del(key);
    }
    async setEx(key: string, value: string, time: number) {
        return this.client.setex(key, time, value);
    }
    async setList(key: string, value: string) {
        return this.client.lpush(key, value);
    }
    async getListLength(key: string) {
        return this.client.llen(key);
    }
}

export default new RedisService;