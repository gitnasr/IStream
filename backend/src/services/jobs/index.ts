import {Queue, Worker} from 'bullmq';

import JobHandlers from './handlers';
import RedisService from '../redis';
import moment from 'moment';

class Jobs {
	Akoam: Queue;
	constructor() {
		new Worker('AKOAM', JobHandlers.Akoam, {
			connection: RedisService.client,
			concurrency: 5,
			removeOnComplete: {age: moment.duration(1, 'hour').asMilliseconds(), count: 4}
		});
		this.Akoam = new Queue('AKOAM', {
			connection: RedisService.client,
			defaultJobOptions: {
				attempts: 10,
				backoff: {
					type: 'exponential',
					delay: 5000
				},
				removeOnComplete: {age: moment.duration(1, 'hour').asMilliseconds(), count: 4}
			}
		});
	}
}

export default new Jobs();
