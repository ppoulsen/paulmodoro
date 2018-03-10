import {
  RECENT_DESCRIPTIONS_LOADED,
  SESSIONS_LOADED,
} from '../actions/history';
import {
  START_TIMER,
} from '../actions/timer';

// This is redundant now, but can be used to combine paginated sessions with
// already queried ones
function combineSessions(currentSessions, nextSessions) {
  const nextIds = new Set(nextSessions.map(s => s.id));
  const filteredCurrent = currentSessions.filter(s => !nextIds.has(s.id));
  return nextSessions.concat(filteredCurrent).sort((a, b) => b.id - a.id);
}

export default function history(state = {
  recentDescriptions: [],
  sessions: [],
}, action) {
  switch (action.type) {
    case RECENT_DESCRIPTIONS_LOADED:
      return {
        ...state,
        recentDescriptions: action.recentDescriptions,
      };
    case SESSIONS_LOADED:
      return {
        ...state,
        sessions: combineSessions(state.sessions, action.sessions),
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
