export const SET_SESSION_LENGTH_MINUTES = 'SET_SESSION_LENGTH_MINUTES';
export const SET_BREAK_LENGTH_MINUTES = 'SET_BREAK_LENGTH_MINUTES';
export const SET_SOUND_ENABLED = 'SET_SOUND_ENABLED';

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
