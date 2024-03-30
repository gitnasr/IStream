import {Redis}  from 'ioredis';
import { vars } from '@/config';

const RedisService = new Redis(vars.redis.url, {maxRetriesPerRequest: null});


export default RedisService;