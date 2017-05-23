/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TimerPage from './containers/TimerPage';

export default () => (
  <App>
    <Switch>
      <Route path="/timer" component={TimerPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
