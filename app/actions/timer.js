import moment from 'moment';
import {
  SESSION_TIMER,
  BREAK_TIMER,
} from '../constants/timerType';

export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TICK_TIMER = 'TICK_TIMER';

export function stopTimer() {
  return {
    type: STOP_TIMER,
  };
}

function playSoundIfEnabled(soundEnabled, sound) {
  if (soundEnabled) {
    new Audio(`static/audio/${sound}.mp3`).play();
  }
}

export function startTimer() {
  return (dispatch, getState) => {
    const stateAtStart = getState();
    if (stateAtStart.timer.startTime) {
      return;
    }

    dispatch({
      type: START_TIMER,
      timerType: SESSION_TIMER,
    });
    playSoundIfEnabled(stateAtStart.settings.soundEnabled, 'start');

    let interval;
    const tick = () => {
      const state = getState();
      const { startTime, timerType } = state.timer;
      const { sessionLengthMinutes, breakLengthMinutes, soundEnabled } = state.settings;
      const playSound = playSoundIfEnabled.bind(null, soundEnabled);
      const isSession = timerType === SESSION_TIMER;
      const durationMinutes = isSession ? sessionLengthMinutes : breakLengthMinutes;
      const duration = moment.duration(durationMinutes, 'minutes');

      const running = !!startTime && moment().isBefore(startTime.clone().add(duration));
      if (running) {
        dispatch({ type: TICK_TIMER });
      } else if (!!startTime && isSession) {
        dispatch({
          type: START_TIMER,
          timerType: BREAK_TIMER,
        });
        playSound('start-break');
      } else {
        if (startTime) {
          playSound('break-over');
        }
        clearInterval(interval);
        dispatch(stopTimer());
      }
    };

    interval = setInterval(tick, 47);
  };
}
