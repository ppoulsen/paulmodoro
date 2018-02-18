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

export function startTimer() {
  return (dispatch, getState) => {
    if (getState().timer.startTime) {
      return;
    }

    dispatch({
      type: START_TIMER,
      timerType: SESSION_TIMER,
    });
    new Audio('static/audio/start.mp3').play();

    let interval;
    const tick = () => {
      const state = getState();
      const { startTime, timerType } = state.timer;
      const { sessionLengthMinutes, breakLengthMinutes } = state.settings;
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
        new Audio('static/audio/start-break.mp3').play();
      } else {
        if (startTime) {
          new Audio('static/audio/break-over.mp3').play();
        }
        clearInterval(interval);
        dispatch(stopTimer());
      }
    };

    interval = setInterval(tick, 47);
  };
}
