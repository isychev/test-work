import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectorEntity } from 'selectors/entity';
import { ENTITIES } from 'appConstants';
import sagaWelcome, { onLogout as onLogoutAction } from 'ducks/duckWelcome';
import withSaga from 'decorators/withSaga';

class Welcome extends Component {
  handleClickLogout = () => {
    this.props.onLogout();
  };
  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="row col-md-7 col-lg-5  align-self-center">
          <div className="card w-100">
            <div className="d-flex justify-content-center mt-3" />
            <div className="card-header">
              <h1>{`Welcome ${user.login}`} </h1>
            </div>
            <div className="card-body">
              <button
                className="btn-link"
                type="button"
                onClick={this.handleClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};
Welcome.defaultProps = {};

export default compose(
  withSaga({ sagaWelcome }),
  connect(
    state => ({
      user: selectorEntity(state, { entityAlias: ENTITIES.USER }),
    }),
    { onLogout: onLogoutAction },
  ),
)(Welcome);
