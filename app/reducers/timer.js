import moment from 'moment';
import {
  START_TIMER,
  STOP_TIMER,
  TICK_TIMER,
} from '../actions/timer';

export default function timer(state = {
  startTime: null,
  duration: moment.duration(25, 'minutes'),
}, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        startTime: moment(),
        duration: moment.duration(25, 'minutes'),
      };
    case STOP_TIMER:
      return {
        ...state,
        startTime: null,
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
