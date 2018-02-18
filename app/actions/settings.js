export const SET_SESSION_LENGTH_MINUTES = 'SET_SESSION_LENGTH_MINUTES';
export const SET_BREAK_LENGTH_MINUTES = 'SET_BREAK_LENGTH_MINUTES';
export const SET_SOUND_ENABLED = 'SET_SOUND_ENABLED';
export const SET_NOTIFICATIONS_ENABLED = 'SET_NOTIFICATIONS_ENABLED';
export const SET_SLACK_LEGACY_TOKENS = 'SET_SLACK_LEGACY_TOKENS';

export function setSessionLengthMinutes(minutes) {
  return {
    type: SET_SESSION_LENGTH_MINUTES,
    minutes,
  };
}

export function setBreakLengthMinutes(minutes) {
  return {
    type: SET_BREAK_LENGTH_MINUTES,
    minutes,
  };
}

export function setSoundEnabled(soundEnabled) {
  return {
    type: SET_SOUND_ENABLED,
    soundEnabled,
  };
}

export function setNotificationsEnabled(notificationsEnabled) {
  return {
    type: SET_NOTIFICATIONS_ENABLED,
    notificationsEnabled,
  };
}

export function setSlackLegacyTokens(slackLegacyTokens) {
  return {
    type: SET_SLACK_LEGACY_TOKENS,
    slackLegacyTokens,
  };
}
