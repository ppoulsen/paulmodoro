import {
  START_TIMER,
  STOP_TIMER,
  TICK_TIMER,
  SESSION_KEY,
  UPDATE_TIMER_DESCRIPTION,
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
        startTime: action.startTime,
        timerType: action.timerType,
      };
    case STOP_TIMER:
      return {
        ...state,
        startTime: null,
        timerType: SESSION_TIMER,
        key: null,
      };
    case TICK_TIMER:
      return {
        ...state,
        tick: !state.tick,
      };
    case SESSION_KEY:
      return {
        ...state,
        key: action.key,
      };
    case UPDATE_TIMER_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}
