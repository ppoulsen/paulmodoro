import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconAlarm from 'material-ui/svg-icons/action/alarm';
import IconSettings from 'material-ui/svg-icons/action/settings';

import { toggleMenu } from '../actions/menu';

const App = (props) => (
  <div>
    <AppBar
      title="Paulmodoro"
      iconElementLeft={<IconButton onClick={props.onMenuToggle}><NavigationMenu /></IconButton>}
      style={{ position: 'fixed', top: 0 }}
    />
    <Drawer open={props.drawerOpen} docked={false} onRequestChange={props.onMenuToggle}>
      <Menu>
        <MenuItem primaryText="Timer" leftIcon={<IconAlarm />} onClick={() => { props.history.push('/timer'); props.onMenuToggle(); }} />
        <MenuItem primaryText="Settings" leftIcon={<IconSettings />} onClick={() => { props.history.push('/settings'); props.onMenuToggle(); }} />
      </Menu>
    </Drawer>
    {props.children}
  </div>
);

function mapStateToProps(state) {
  return {
    drawerOpen: state.menu.isOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMenuToggle: () => dispatch(toggleMenu()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
