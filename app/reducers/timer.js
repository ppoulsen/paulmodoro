import moment from 'moment';
import {
  START_TIMER,
  STOP_TIMER,
  TICK_TIMER,
} from '../actions/timer';
import {
  SESSION_TIMER,
} from '../constants/timerType';

export default function timer(state = {
  startTime: null,
}, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        startTime: moment(),
        timerType: action.timerType,
      };
    case STOP_TIMER:
      return {
        ...state,
        startTime: null,
        timerType: SESSION_TIMER,
      };
    case TICK_TIMER:
      return {
        ...state,
        tick: !state.tick,
      };
    default:
      return state;
  }
}
