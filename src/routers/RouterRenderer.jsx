import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const RouterRenderer = ({ routes }) => (
  <Switch>
    {routes.map(route => (
      <RouteWithSubRoutes
        key={`${route.path}${(route.location || {}).key}`}
        {...route}
        route={route}
      />
    ))}
  </Switch>
);

RouterRenderer.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RouterRenderer;
