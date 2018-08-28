import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import storeFactory from 'storeFactory';
import routesMap from 'routing/routesMap';
import RouterRenderer from 'routers/RouterRenderer';
import sagaMain from 'sagas';
import reducerMain from 'reducers';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = storeFactory({ sagas: sagaMain, reducer: reducerMain });
  }
  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.store.history}>
          <div className="h-100">
            <RouterRenderer routes={routesMap} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
