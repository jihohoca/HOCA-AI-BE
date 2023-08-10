import express, { Router } from 'express';
import authRoute from './auth.route';
import docsRoute from './swagger.route';
import userRoute from './user.route';
import fieldRoute from './field.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/field',
    route: fieldRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
];


defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;
