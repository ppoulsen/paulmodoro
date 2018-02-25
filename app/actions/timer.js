import moment from 'moment-timezone';
import {
  SESSION_TIMER,
  BREAK_TIMER,
} from '../constants/timerType';
import { sendSlackStatus, notifyIfEnabled } from './helpers/timerNotifications';
import { createSession, updateSession } from '../persistence/historyDao';

export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TICK_TIMER = 'TICK_TIMER';
export const SESSION_KEY = 'SESSION_KEY_TIMER';
export const UPDATE_TIMER_DESCRIPTION = 'UPDATE_TIMER_DESCRIPTION';

export function updateTimerDescription(description) {
  return {
    type: UPDATE_TIMER_DESCRIPTION,
    description,
  };
}

function stopTimer() {
  return (dispatch, getState) => {
    dispatch({
      type: STOP_TIMER,
    });
    const state = getState();
    state.settings.slackLegacyTokens.filter(t => t.isEnabled).forEach(token => {
      sendSlackStatus('canceled', token.value, state);
    });
  };
}

export function cancelTimer() {
  return (dispatch, getState) => {
    // Grab state before stopping timer
    const state = getState();
    dispatch(stopTimer());
    const { key, timerType } = state.timer;
    const time = moment();
    if (key) {
      if (timerType === SESSION_TIMER) {
        updateSession(key, {
          canceledSessionTime: time.toDate(),
          canceledSessionTimeIson: time.format(),
          finishedSession: false,
        });
      } else if (timerType === BREAK_TIMER) {
        updateSession(key, {
          canceledBreakTime: time.toDate(),
          canceledBreakTimeIson: time.format(),
          finishedBreak: false,
        });
      }
    }
  };
}

function startInterval(getState, dispatch) {
  let interval;
  const tick = () => {
    const state = getState();
    const {
      startTime,
      timerType,
      key,
      description,
    } = state.timer;
    const {
      sessionLengthMinutes,
      breakLengthMinutes,
    } = state.settings;
    /* eslint-disable no-use-before-define */
    const notify = notifyIfEnabled.bind(null, state, dispatch.bind(null, startTimer(true)));
    /* eslint-enable no-use-before-define */
    const isSession = timerType === SESSION_TIMER;
    const durationMinutes = isSession ? sessionLengthMinutes : breakLengthMinutes;
    const duration = moment.duration(durationMinutes, 'minutes');

    const running = startTime && moment().isBefore(startTime.clone().add(duration));
    if (running) {
      dispatch({ type: TICK_TIMER });
    } else if (startTime && isSession) {
      const nextStartTime = moment();
      dispatch({
        type: START_TIMER,
        timerType: BREAK_TIMER,
        startTime: nextStartTime,
        description,
      });
      if (key) {
        updateSession(key, {
          endTime: nextStartTime.toDate(),
          endTimeIso: nextStartTime.format(),
          finishedSession: true,
        });
      }
      notify('start-break');
    } else {
      if (startTime) {
        const endBreakTime = moment();
        notify('break-over');
        if (key) {
          updateSession(key, {
            endBreakTime: endBreakTime.toDate(),
            endBreakTimeIso: endBreakTime.format(),
            finishedBreak: true,
          });
        }
      }
      clearInterval(interval);
      dispatch(stopTimer());
    }
  };

  interval = setInterval(tick, 47);
}

export function startTimer(force) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.timer.startTime && !force) {
      return;
    }

    const startTime = moment();
    dispatch({
      type: START_TIMER,
      timerType: SESSION_TIMER,
      startTime,
      description: state.timer.description,
    });
    notifyIfEnabled(state, dispatch.bind(null, startTimer(true)), 'start');
    startInterval(getState, dispatch);
    createSession({
      startTime: startTime.toDate(),
      startTimeIso: startTime.format(),
      description: state.timer.description || null,
    }).then(key => dispatch({
      type: SESSION_KEY,
      key,
    })).catch((e) => console.error(e));
  };
}
