import React from 'react';
import { Route } from 'react-router-dom';
import RouterRenderer from './RouterRenderer';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} route={route}>
        {route.routes ? <RouterRenderer routes={route.routes} /> : null}
      </route.component>
    )}
  />
);

export default RouteWithSubRoutes;
