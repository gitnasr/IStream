import {Job, Queue} from 'bullmq';

import {vars} from '@/config';

export const Q = new Queue('AEBOT', {
	connection: {
		host: vars.redis.host,
		port: vars.redis.port,
		password: vars.redis.password
	}
});

export async function addJobToQueue<T>(data: T, taskId: string): Promise<Job<T>> {
	return Q.add(taskId, data, {jobId: taskId, removeOnComplete: false, removeOnFail: false, attempts: 3});
}

// class Tasker extends RedisService {
// 	Q: Queue;
// 	private service: Enums.Services;
// 	constructor(service: Enums.Services) {
// 		super();
// 		this.service = service;
// 		this.Q = new Queue(this.service, {connection: this.client});
// 	}

// 	getJobs() {
// 		return this.Q.getJobCounts();
// 	}
// 	async addJob(data: Record<string, any>, J: Processor, taskId: string) {
// 		new Worker(this.service, J, {connection: this.client});
// 		await this.Q.add(taskId, data, {jobId: taskId});
// 		return taskId;
// 	}
// 	getJobById(id: string) {
// 		return this.Q.getJob(id);
// 	}
// }

// export default Tasker;
