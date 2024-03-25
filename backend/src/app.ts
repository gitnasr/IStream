import express, {Express} from 'express';
import {handlers, vars} from './config';
import ipinfo, {originatingIPSelector} from 'ipinfo-express';

import { ApiError } from '@/middlewares/errors';
import {Errors} from '@/middlewares';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import router from './routes';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json({limit: '50mb'}));


app.use(ExpressMongoSanitize());
app.use(compression());

app.use(
	ipinfo({
		token: vars.ipinfo.token,
		cache: null,
		timeout: 5000,
		ipSelector: originatingIPSelector
	})
);
app.use(handlers.successHandler);
app.use(handlers.errorHandler);
app.use('/api', router);


app.use((req, res, next) => {
	next(new ApiError(404, 'Not found'));
});


// convert error to ApiError, if needed
app.use(Errors.errorConverter);

// handle error
app.use(Errors.errorHandler);

app.listen(vars.port, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
	.connect(vars.mongoose.url)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(err => {
		console.error('Error connecting to MongoDB: ', err);
		process.exit(1);
	});
