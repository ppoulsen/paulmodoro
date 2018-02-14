import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import TimerPage from './containers/TimerPage';
import SettingsPage from './containers/SettingsPage';

const mapStateToProps = state => ({ location: state.router.location });

const ConnectedSwitch = connect(mapStateToProps)(Switch);

export default () => (
  <App>
    <ConnectedSwitch>
      <Route path="/timer" component={TimerPage} />
      <Route path="/settings" component={SettingsPage} />
    </ConnectedSwitch>
  </App>
);
