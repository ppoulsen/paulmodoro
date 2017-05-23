// @flow
import moment from 'moment';
import type { timerStateType } from './types/timer-state-type';
import {
  START_TIMER,
  STOP_TIMER,
  TICK_TIMER,
} from '../actions/timer';

type actionType = {
  type: string,
};

export default function timer(state: timerStateType = {
  startTime: null,
  duration: moment.duration(25, 'minutes'),
}, action: actionType) {
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
