import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  BREAK_TIMER,
} from '../constants/timerType';
import Timer from '../components/Timer';
import * as TimerActions from '../actions/timer';
import { loadRecentDescriptions } from '../actions/history';

function mapStateToProps(state) {
  return {
    timer: state.timer,
    durationMinutes: state.timer.timerType === BREAK_TIMER
      ? state.settings.breakLengthMinutes
      : state.settings.sessionLengthMinutes,
    recentDescriptions: state.history.recentDescriptions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...TimerActions,
    loadRecentDescriptions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
