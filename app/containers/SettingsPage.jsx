import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import * as SettingsActions from '../actions/settings';

function mapStateToProps(state) {
  return {
    breakLengthMinutes: state.settings.breakLengthMinutes,
    sessionLengthMinutes: state.settings.sessionLengthMinutes,
    soundEnabled: state.settings.soundEnabled,
    notificationsEnabled: state.settings.notificationsEnabled,
    slackLegacyTokens: state.settings.slackLegacyTokens,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
