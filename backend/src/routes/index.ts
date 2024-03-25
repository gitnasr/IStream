import express, {Router} from 'express';

import engineRoute from './engine';
import userRoute from './user';

const router = express.Router();

interface IRoute {
	path: string;
	route: Router;
}

const defaultIRoute: IRoute[] = [
	{
		path: '/engine',
		route: engineRoute
	}, {
		path: '/auth',
		route: userRoute
	}
];

defaultIRoute.forEach(route => {
	router.use(route.path, route.route);
});

export default router;
