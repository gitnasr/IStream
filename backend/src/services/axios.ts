import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

import {CookieJar} from 'tough-cookie';
import axiosRetry from 'axios-retry';

class Axios {
	public axiosInstance: AxiosInstance;
	constructor(jar?: CookieJar) {
		this.axiosInstance = axios.create({
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			jar
		});
		axiosRetry(this.axiosInstance, {
			retries: 3,
			onRetry: (retryCount, error, requestConfig) => {
				// TODO: Register ERROR in DB
			}
		});
	}

	public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.get(url, config);
	}

	public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.post(url, data, config);
	}
	public head<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.head(url, config);
	}
}

export default Axios;
