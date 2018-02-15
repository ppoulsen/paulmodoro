import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  BREAK_TIMER,
} from '../constants/timerType';
import Timer from '../components/Timer';
import * as TimerActions from '../actions/timer';

function mapStateToProps(state) {
  return {
    timer: state.timer,
    durationMinutes: state.timer.timerType === BREAK_TIMER
      ? state.settings.breakLengthMinutes
      : state.settings.sessionLengthMinutes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TimerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
