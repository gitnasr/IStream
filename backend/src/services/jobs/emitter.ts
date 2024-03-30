import {E} from '@/types';
import Jobs from '.';

const schedule = {
	StartByAkoam: async (data: E.StartPayload, jName: string) => {
		const job = await Jobs.Akoam.add(jName, data, {jobId: jName });
		return job;
	}
};

export default schedule;
