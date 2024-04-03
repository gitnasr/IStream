import {Logs} from '@/models';
import redis from './redis';

export const registerError = async (error: Error, operationId: string = 'NO OID') => {
	await Logs.create({
		message: error.message,
		type: 'error',
		timestamp: new Date(),
		trace: error.stack
	});
	await redis.setList('error', `OperationId: ${operationId} - ${new Date()}`);
	// check last 3 errors if within 5 minutes
	const errorListLength = await redis.getListLength('error');
	// if len > 3, check value of last 3 if within 5 minutes send email
	if (errorListLength > 3) {
		const errorList = await redis.client.lrange('error', 0, 2);
		const lastError = errorList[0].split(' - ')[1];
		const lastErrorDate = new Date(lastError.split('OperationId: ')[0]);
		const currentDate = new Date();
		const diff = currentDate.getTime() - lastErrorDate.getTime();
		if (diff < 300000) {
			// send email
			sendNotification(`⚠️ Error: ${lastError} ⚠️, ${errorListLength} errors in 5 minutes`);
		}
	}
	throw error;
};
const sendNotification = async (message: string) => {
	fetch('https://ntfy.sh/AEbot', {
		method: 'POST',
		body: message
	});
};


export const registerLog = async (message: string, type: 'info' | 'error' = 'info') => {
	await Logs.create({
		message,
		type,
		timestamp: new Date()
	});

}