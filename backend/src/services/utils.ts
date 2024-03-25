import Axios from './axios';
import { Cookie } from 'tough-cookie';

abstract class Utils {
	private static axios = new Axios();
	static async getSize(files: string[]): Promise<{bytes: number; BytesAsText: string}> {
		let sizeInBytes = 0;

		for (const link of files) {
			try {
				const response = await this.axios.head(link);
				if (!response) {
					continue;
				}
				const fileSize = parseInt(response.headers['content-length']?.toString() || '0');
				if (!isNaN(fileSize)) {
					sizeInBytes += fileSize;
				}
			} catch (error) {
				console.error(`Error fetching file size for ${link}:`, error);
			}
		}
		return {
			bytes: sizeInBytes,
			BytesAsText: this.parser(sizeInBytes)
		};
	}
	private static parser(bytes: number, decimals: number = 2): string {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
	static parseCookiesAsString(Cookies: Cookie[]): string {
		let cookies = '';
		Cookies.forEach(cookie => {
			cookies += `${cookie.key}=${cookie.value};`;
		});
		return cookies;
	}
}

export default Utils;
