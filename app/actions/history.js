import { getRecentDescriptions, getSessions } from '../persistence/historyDao';

export const RECENT_DESCRIPTIONS_LOADED = 'RECENT_DESCRIPTIONS_LOADED';
export const SESSIONS_LOADED = 'SESSIONS_LOADED';

export function recentDescriptionsLoaded(recentDescriptions) {
  return {
    type: RECENT_DESCRIPTIONS_LOADED,
    recentDescriptions,
  };
}

export function sessionsLoaded(sessions) {
  return {
    type: SESSIONS_LOADED,
    sessions,
  };
}

export function loadRecentDescriptions() {
  return dispatch => {
    getRecentDescriptions().then(descriptions => {
      dispatch(recentDescriptionsLoaded(descriptions));
      return descriptions;
    }).catch(e => console.error(e));
  };
}

// TODO: Paginate
export function loadSessions() {
  return dispatch => {
    getSessions().then(sessions => {
      dispatch(sessionsLoaded(sessions));
      return sessions;
    }).catch(e => console.error(e));
  };
}
