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

function eventShouldNotify(evt) {
  if (evt === 'start') {
    return false;
  }
  return true;
}

function getNotificationTitle(evt) {
  switch (evt) {
    case 'start':
      throw new Error('start event should not notify');
    case 'start-break':
      return 'Short Break Started';
    case 'break-over':
      return 'Short Break Over';
    default:
      throw new Error(`Unrecognized event type: ${evt}`);
  }
}

function getNotificationBody(evt, settings) {
  switch (evt) {
    case 'start':
      throw new Error('start event should not notify');
    case 'start-break':
      return `Break timer set for ${settings.breakLengthMinutes} minute${settings.breakLengthMinutes === 1 ? '' : 's'}!`;
    case 'break-over':
      return 'Click to start a new pomodoro!';
    default:
      throw new Error(`Unrecognized event type: ${evt}`);
  }
}

function getNotificationClickHandler(notification, dispatch, evt) {
  return () => {
    notification.close();
    if (evt === 'break-over') {
      /* eslint-disable no-use-before-define */
      dispatch(startTimer(true));
      /* eslint-enable no-use-before-define */
    }
  };
}

function notifyIfEnabled(settings, dispatch, evt) {
  if (settings.soundEnabled) {
    new Audio(`static/audio/${evt}.mp3`).play();
  }
  if (settings.notificationsEnabled && eventShouldNotify(evt)) {
    const notification = new Notification(getNotificationTitle(evt), {
      body: getNotificationBody(evt, settings),
      noscreen: true,
    });
    notification.onclick = getNotificationClickHandler(notification, dispatch, evt);
  }
}

export function startTimer(force) {
  return (dispatch, getState) => {
    const stateAtStart = getState();
    if (stateAtStart.timer.startTime && !force) {
      return;
    }

    dispatch({
      type: START_TIMER,
      timerType: SESSION_TIMER,
    });
    notifyIfEnabled(stateAtStart.settings, dispatch, 'start');

    let interval;
    const tick = () => {
      const state = getState();
      const { startTime, timerType } = state.timer;
      const {
        sessionLengthMinutes,
        breakLengthMinutes,
      } = state.settings;
      const notify = notifyIfEnabled.bind(null, state.settings, dispatch);
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
        notify('start-break');
      } else {
        if (startTime) {
          notify('break-over');
        }
        clearInterval(interval);
        dispatch(stopTimer());
      }
    };

    interval = setInterval(tick, 47);
  };
}
