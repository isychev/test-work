import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import sagaLogin, { onSubmitAction } from 'ducks/duckLogin';
import withSaga from 'decorators/withSaga';

class Login extends Component {
  state = {
    form: {
      login: '',
      password: '',
    },
  };
  handleChange = fieldName => e => {
    this.setState({
      form: {
        ...this.state.form,
        [fieldName]: e.target.value,
      },
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ form: this.state.form });
  };

  render() {
    const { form } = this.state;
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="row col-md-7 col-lg-5  align-self-center">
          <div className="card w-100">
            <div className="d-flex justify-content-center mt-3" />
            <div className="card-header">
              <h1 className="h3 mb-3 ml-4 mt-2 font-weight-normal">Auth</h1>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="loginField">Login</label>
                  <input
                    id="loginField"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter login"
                    value={form.login}
                    onChange={this.handleChange('login')}
                  />
                  <small className="form-text text-muted">Any login</small>
                </div>
                <div className="form-group">
                  <label htmlFor="passField">Password</label>
                  <input
                    id="passField"
                    type="password"
                    required
                    className="form-control"
                    placeholder="password"
                    value={form.password}
                    onChange={this.handleChange('password')}
                  />
                  <small className="form-text text-muted">Any pass</small>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
Login.defaultProps = {};

export { Login as LoginBase };

export default compose(
  withSaga({ sagaLogin }),
  connect(
    null,
    {
      onSubmit: onSubmitAction,
    },
  ),
)(Login);
