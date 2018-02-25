import { getRecentDescriptions } from '../persistence/historyDao';

export const RECENT_DESCRIPTIONS_LOADED = 'RECENT_DESCRIPTIONS_LOADED';

export function recentDescriptionsLoaded(recentDescriptions) {
  return {
    type: RECENT_DESCRIPTIONS_LOADED,
    recentDescriptions,
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
