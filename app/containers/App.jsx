import * as React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import { toggleMenu } from '../actions/menu';

const App = (props) => (
  <div>
    <AppBar
      title="Paulmodoro"
      iconElementLeft={<IconButton onClick={props.onMenuToggle}><NavigationMenu /></IconButton>}
    />
    <Drawer open={props.drawerOpen} docked={false} onRequestChange={props.onMenuToggle} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
