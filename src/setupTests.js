import React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import storeFactory from 'storeFactory';
import reducerMain from 'reducers';

enzyme.configure({ adapter: new Adapter() });

export const getTestStore = (preloadData, Component) => {
  const store = storeFactory({ preloadData, reducer: reducerMain });
  return {
    store,
    Component: props => (
      <Provider store={store}>
        <ConnectedRouter history={store.history}>
          <Component {...props} />
        </ConnectedRouter>
      </Provider>
    ),
  };
};
