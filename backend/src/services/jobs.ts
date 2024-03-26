import {Processor, Queue, Worker} from 'bullmq';

import {Enums} from '@/types';
import RedisService from './redis';

class Tasker extends RedisService {
	Q: Queue;
	private service: Enums.Services;
	constructor(service: Enums.Services) {
		super();
		this.service = service;
		this.Q = new Queue(this.service, {connection: this.client});
	}

	getJobs() {
		return this.Q.getJobCounts();
	}
	async addJob(data: Record<string, any>, J: Processor, taskId: string) {
		new Worker(this.service, J, {connection: this.client});
		await this.Q.add(taskId, data, {jobId: taskId});
		return taskId;
	}
	getJobById(id: string) {
		return this.Q.getJob(id);
	}
}

export default Tasker;
