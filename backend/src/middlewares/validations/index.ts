import {Enums} from '@/types';
import Joi from 'joi';
import Validation from '../validation';
const ByQueryId = {
	query: {
		id: Joi.string().required().label('ID').min(4).max(24).trim()
	}
};
const Track = {
	params: {
		action: Joi.string().required().label('Action')
	},
	query: {
		id: Joi.string().required().label('ID').min(4).max(24)
	}
};

const Start = {
	body: Joi.object({
		link: Joi.string().required().trim().uri().message('اللينك ده مش لينك اكوام الجديد').label('اللينك'),
		q: Joi.string()
			.required()
			.equal(...Object.values(Enums.Quality))
			.label('الجودة'),
		user: Joi.object()
			.required()
			.keys({
				uId: Joi.string().required().label('المستخدم'),
				username: Joi.string().required().label('المستخدم')
			}),
		source: Joi.string()
			.required()
			.equal(...Object.values(Enums.Sources))
			.label('المصدر')
	})
};

export {ByQueryId, Start, Track, Validation};
