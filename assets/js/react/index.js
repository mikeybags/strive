import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, hashHistory} from 'react-router';
import promise from 'redux-promise';
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';

import routes from './routes'
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, createCookieMiddleware(Cookies))(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
  , document.querySelector('#container'));
