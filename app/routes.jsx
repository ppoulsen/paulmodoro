import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HistoryPage from './containers/HistoryPage';
import SettingsPage from './containers/SettingsPage';
import TimerPage from './containers/TimerPage';

const mapStateToProps = state => ({ location: state.router.location });

const ConnectedSwitch = connect(mapStateToProps)(Switch);

export default () => (
  <App>
    <ConnectedSwitch>
      <Route path="/timer" component={TimerPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/history" component={HistoryPage} />
    </ConnectedSwitch>
  </App>
);
