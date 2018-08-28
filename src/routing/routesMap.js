import * as pages from '../pages';

const routesMap = [
  {
    path: '/login',
    component: pages.Login,
  },
  {
    path: '/',
    component: pages.BasicLayout,
    routes: [
      {
        title: 'Welcome',
        path: '/welcome',
        component: pages.Welcome,
      },
    ],
  },
];

export default routesMap;
