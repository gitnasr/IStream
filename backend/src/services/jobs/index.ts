import {Queue, Worker} from 'bullmq';

import JobHandlers from './handlers';
import { Redis } from 'ioredis'
import RedisService from '../redis';
import moment from 'moment';
import {vars} from '@/config';

const AkoamQ = new Queue('AKOAM', {connection: RedisService, });
const AkoamW = new Worker('AKOAM', JobHandlers.Akoam, {
	connection: RedisService,
	concurrency: 5,
	removeOnComplete: {
		age: moment.duration(1, 'hour').asMilliseconds(),
		count: 4
	}
});

export const Akoam = AkoamQ;
export const AkoamWorker = AkoamW;

