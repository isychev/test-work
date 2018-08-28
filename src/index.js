import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import applyAxiosMocks from './mocks';

if (process.env.NODE_ENV !== 'production') {
  applyAxiosMocks();
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
