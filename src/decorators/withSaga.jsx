import React, { Component as ReactComponent } from 'react';
import { removeSaga, injectSagas } from '../services';

const withSagaHOC = (sagasObject = {}) => Component =>
  class WithAppendSaga extends ReactComponent {
    componentDidMount() {
      const normalizeSagasObject = this.props.sagas || sagasObject;
      // this.sagas = normalizeSagasObject;
      const sagaObj = Object.keys(normalizeSagasObject).reduce(
        (result, sagaName) => {
          const currObj = normalizeSagasObject[sagaName];
          if (currObj.saga) {
            return {
              ...result,
              [sagaName]: {
                ...normalizeSagasObject[sagaName],
                options: {
                  ...(normalizeSagasObject[sagaName].options || {}),
                  sagaProps: {
                    ...(normalizeSagasObject[sagaName].options || {}).sagaProps,
                    ...this.props,
                  },
                },
              },
            };
          }
          return {
            ...result,
            [sagaName]: {
              saga: normalizeSagasObject[sagaName],
              options: {
                sagaProps: this.props,
              },
            },
          };
        },
        {},
      );
      const sagaObjResult = Object.keys(sagaObj).reduce((result, sagaName) => {
        if (sagaObj[sagaName].options.single) {
          return {
            ...result,
            [sagaName]: sagaObj[sagaName],
          };
        }
        return {
          ...result,
          [sagaName]: sagaObj[sagaName],
        };
      }, {});
      this.sagas = sagaObjResult;
      injectSagas(sagaObjResult);
    }
    componentWillUnmount() {
      Object.keys(this.sagas).forEach(sagaName => {
        removeSaga(sagaName);
      });
    }
    render() {
      const normalizeSagasObject = this.props.sagas || sagasObject;
      return <Component {...this.props} sagas={normalizeSagasObject} />;
    }
  };

export default withSagaHOC;
