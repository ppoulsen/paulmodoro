import {
  SET_SESSION_LENGTH_MINUTES,
  SET_BREAK_LENGTH_MINUTES,
} from '../actions/settings';
import config from '../config';

export default function settings(state = {
  sessionLengthMinutes: 25,
  breakLengthMinutes: 5,
}, action) {
  let nextState = state;
  switch (action.type) {
    case SET_SESSION_LENGTH_MINUTES:
      nextState = {
        ...state,
        sessionLengthMinutes: action.minutes,
      };
      break;

    case SET_BREAK_LENGTH_MINUTES:
      nextState = {
        ...state,
        breakLengthMinutes: action.minutes,
      };
      break;

    default:
      return state;
  }

  config.set('settings', nextState);
  return nextState;
}
