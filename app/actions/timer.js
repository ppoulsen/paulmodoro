import moment from 'moment';

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
    });

    let interval;
    const tick = () => {
      const state = getState();
      const startTime = state.timer.startTime;

      const running = !!startTime && moment().isBefore(startTime.clone().add(state.timer.duration));
      if (running) {
        dispatch({ type: TICK_TIMER });
      } else {
        clearInterval(interval);
        dispatch(stopTimer());
      }
    };

    interval = setInterval(tick, 10);
  };
}
