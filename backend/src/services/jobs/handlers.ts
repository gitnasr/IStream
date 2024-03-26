import {AkoamService, Queries} from '..';
import {E, Enums} from '@/types';

import {Job} from 'bullmq';

const JobHandlers = {
	Akoam: async (job: Job<E.StartPayload>) => {
        const {operationId, episodes, quality} = job.data;
        try {
            const  result =  await AkoamService.Start(operationId, episodes, quality);
            return result
        } catch (error) {
            await Queries.updateStatus(operationId, Enums.Status.FAILED);
            throw error;
        }
	
	}
};
export default JobHandlers;
