import {
  RECENT_DESCRIPTIONS_LOADED,
} from '../actions/history';
import {
  START_TIMER,
} from '../actions/timer';

export default function history(state = {
  recentDescriptions: [],
}, action) {
  switch (action.type) {
    case RECENT_DESCRIPTIONS_LOADED:
      return {
        ...state,
        recentDescriptions: action.recentDescriptions,
      };
    case START_TIMER:
      if (action.description && state.recentDescriptions.indexOf(action.description) === -1) {
        return {
          ...state,
          recentDescriptions: [action.description, ...state.recentDescriptions],
        };
      }
      return state;
    default:
      return state;
  }
}
