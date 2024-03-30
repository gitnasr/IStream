import {Queue, Worker} from 'bullmq';

import JobHandlers from './handlers';
import RedisService from '../redis';
import moment from 'moment';

const AkoamQ = new Queue('AKOAM', {connection: RedisService.client});
const AkoamW = new Worker('AKOAM', JobHandlers.Akoam, {
	connection: RedisService.client,
	concurrency: 5,
	removeOnComplete: {
		age: moment.duration(1, 'hour').asMilliseconds(),
		count: 4
	}
});

export const Akoam = AkoamQ;
export const AkoamWorker = AkoamW;
