import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { injectorSaga } from './services/index';

// создаем стор
const createStore = ({ sagas, reducer, preloadData = {} }) => {
  // const isBrowser = Boolean(window.localStorage);
  const history = createHistory();
  const reduxDevTools = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window[reduxDevTools] || compose;
  let logger;

  if (process.env.NODE_ENV !== 'production') {
    logger = createLogger({
      collapsed: true,
    });
  } else {
    logger = null;
  }
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    logger,
  ].filter(Boolean);

  const enhancers = [applyMiddleware(...middlewares)];

  const store = reduxCreateStore(
    reducer,
    preloadData,
    composeEnhancers(...enhancers),
  );
  sagaMiddleware.run(injectorSaga);
  if (sagas) {
    sagaMiddleware.run(sagas);
  }
  window.store = store;
  store.history = history;
  return store;
};

export default createStore;
