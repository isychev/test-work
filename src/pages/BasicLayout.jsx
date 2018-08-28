import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { onLoadEntity } from 'actions/entity';
import { selectorEntity } from 'selectors';
import { withAsyncRequest } from 'decorators/withAsyncRequest';

import { ENTITIES } from '../appConstants';

const BasicLayout = ({ children, login }) => {
  if (!login) {
    return null;
  }
  return (
    <div id="basicLayout" className="row h-100 no-gutters flex-md-nowrap">
      <div className="col h-100 bg-body">{children}</div>
    </div>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node,
  login: PropTypes.objectOf(PropTypes.any),
};
BasicLayout.defaultProps = {
  children: null,
  login: null,
};

export { BasicLayout as BasicLayoutComponent };

export default compose(
  connect(state => ({
    login: selectorEntity(state, { entityAlias: ENTITIES.LOGIN }),
  })),
  withAsyncRequest([
    onLoadEntity({
      entityAlias: ENTITIES.USER,
      url: '/user/current',
    }),
  ]),
)(BasicLayout);
