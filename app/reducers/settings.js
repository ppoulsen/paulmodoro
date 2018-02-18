import {
  SET_SESSION_LENGTH_MINUTES,
  SET_BREAK_LENGTH_MINUTES,
  SET_SOUND_ENABLED,
  SET_NOTIFICATIONS_ENABLED,
  SET_SLACK_LEGACY_TOKENS,
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

    case SET_SOUND_ENABLED:
      nextState = {
        ...state,
        soundEnabled: action.soundEnabled,
      };
      break;

    case SET_NOTIFICATIONS_ENABLED:
      nextState = {
        ...state,
        notificationsEnabled: action.notificationsEnabled,
      };
      break;

    case SET_SLACK_LEGACY_TOKENS:
      nextState = {
        ...state,
        slackLegacyTokens: action.slackLegacyTokens,
      };
      break;

    default:
      return state;
  }

  config.set('settings', nextState);
  return nextState;
}
