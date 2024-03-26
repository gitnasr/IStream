import 'dotenv/config';

import Joi from 'joi';
import {configDotenv} from 'dotenv';

configDotenv({path: process.env.NODE_ENV === 'development' ? '.env' : '.env.prod'});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
		PORT: Joi.number().default(3000),
		MONGODB_URL: Joi.string().required().description('Mongo DB url'),
		JWT_AUTH: Joi.string().required().description('JWT secret key'),
		IP: Joi.string().required().description('IP Info Api Key'),
		REDIS_URL: Joi.string().required().description('Redis url'),
		CAPTCHA_2API_KEY: Joi.string().required().description('2Captcha API Key')
	})
	.unknown();
const {value: envVars, error} = envVarsSchema
	.prefs({
		errors: {
			label: 'key'
		}
	})
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

const config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongoose: {
		url: envVars.MONGODB_URL + ('iStream' +  '-' + envVars.NODE_ENV ),
		options: {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	},
	jwt: {
		auth: envVars.JWT_AUTH,
	},

	redis: {
		url: envVars.REDIS_URL
	},

	ipinfo: {
		token: envVars.IP
	},
	captcha: envVars.CAPTCHA_2API_KEY
};

export default config;
