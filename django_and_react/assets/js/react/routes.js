import React from 'react';
import {Route, IndexRoute} from 'react-router';
import { sessionService } from 'redux-react-session';

import App from './components/app';
import UsersNew from './containers/users_new';
import SessionsNew from './containers/sessions_new';
import Home from './containers/home'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={UsersNew} />
    <Route path='login' component={SessionsNew} />
    <Route path='home' component={Home} />
  </Route>
);
