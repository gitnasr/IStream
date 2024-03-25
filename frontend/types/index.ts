interface IUser {
  country: string
  username: string
  avatar: string
  scrapies: Scrapy[]
  uId: string
  lastActivity: Date
  ip: string
}
 enum Quality {
	'LOW' = '720',
	'HIGH' = '1080',
	'MEDIUM' = '480'
}
 enum Status {
	'PENDING' = 'PENDING',
	'SUCCESS' = 'SUCCESS',
	'FAILED' = 'FAILED',
	'PROCESSING' = 'PROCESSING'
}
 enum Services {
	'AKOAM' = 'AKOAM',
	'ARABSEED' = 'ARABSEED',
	'CIMA4U' = 'CIMA4U',
	'UNKNOWN' = 'UNKNOWN'
}
 enum Sources {
	'BY_WEBSITE' = 'BY_WEBSITE',
	'BY_EXTENSION' = 'BY_EXTENSION'
}
 enum Devices {
	MOBILE = 'MOBILE',
	DESKTOP = 'DESKTOP'
}
 export enum Actions {
	'DOWNLOAD' = 'DOWNLOAD',
	'COPY' = 'COPY',
	'VIEW' = 'VIEW'
}

 enum SupportedDomains {
	CIMA4U = 'https://www.cima4u.pro/',
	AKOAM = 'https://ak.sv',
	ARABSEED = 'https://m12.asd.homes/',
	UNKNOWN = ''
}

export type User = IUser

export interface AuthContext {
  isAuthenticated: boolean
  user: User | undefined
  update: () => void
}
export interface Scrapy {
	title: string;
	service: Services;
	story: string;
	poster: string;
	status: Status;
	user: string;
	operationId: string;
	quality: Quality;
	expiresAt: Date;
	source: Sources;
	result: ScrapyResponse;
    logo: string;
    link: string
    episodes_count: number
	progress: number
	progressMessage: string
}

export interface ScrapyResponse {
	ScrapyId: string;
	Links: string[];
	views: number;
	session: string;
	isProcessed: boolean;
	timeTaken: number;
	count: number;
	size: string;
	sizeInBytes: number;
}