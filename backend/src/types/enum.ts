export enum Quality {
	'LOW' = '720',
	'HIGH' = '1080',
	'MEDIUM' = '480'
}
export enum Status {
	'PENDING' = 'PENDING',
	'SUCCESS' = 'SUCCESS',
	'FAILED' = 'FAILED',
	'PROCESSING' = 'PROCESSING'
}
export enum Services {
	'AKOAM' = 'AKOAM',
	'ARABSEED' = 'ARABSEED',
	'CIMA4U' = 'CIMA4U',
	'UNKNOWN' = 'UNKNOWN'
}
export enum Sources {
	'BY_WEBSITE' = 'BY_WEBSITE',
	'BY_EXTENSION' = 'BY_EXTENSION'
}
export enum Devices {
	MOBILE = 'MOBILE',
	DESKTOP = 'DESKTOP'
}
export enum Actions {
	'DOWNLOAD' = 'DOWNLOAD',
	'COPY' = 'COPY',
	'VIEW' = 'VIEW'
}

export enum SupportedDomains {
	CIMA4U = 'https://www.cima4u.pro/',
	AKOAM = 'https://ak.sv',
	ARABSEED = 'https://m12.asd.homes/',
	UNKNOWN = ''
}
