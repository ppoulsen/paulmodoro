import moment from 'moment-timezone';
import {
  SESSION_TIMER,
  BREAK_TIMER,
} from '../constants/timerType';

export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TICK_TIMER = 'TICK_TIMER';

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

function sendSlackStatus(evt, token, state) {
  const { sessionLengthMinutes } = state.settings;
  const endTime = moment().add(sessionLengthMinutes, 'minutes');
  const timeDisplay = `${endTime.format('h:mm A')} ${moment.tz(moment.tz.guess()).format('z')}`;
  let profile = null;
  switch (evt) {
    case 'start':
      profile = {
        status_text: `Pomodoro ends at ${timeDisplay}`,
        status_emoji: ':tomato:',
      };
      break;
    default:
      profile = {
        status_text: '',
        status_emoji: '',
      };
      break;
  }
  const profileJson = JSON.stringify(profile);
  const encodedProfile = encodeURIComponent(profileJson);
  const baseUrl = 'https://slack.com/api/users.profile.set';
  const fullUrl = `${baseUrl}?token=${token}&profile=${encodedProfile}`;
  return fetch(fullUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-cache',
    referrer: 'no-referred',
  });
}

function notifyIfEnabled(state, dispatch, evt) {
  const { settings } = state;
  if (settings.soundEnabled) {
    new Audio(`paulmodoro://static/audio/${evt}.mp3`).play();
  }
  if (settings.notificationsEnabled && eventShouldNotify(evt)) {
    const notification = new Notification(getNotificationTitle(evt), {
      body: getNotificationBody(evt, settings),
      noscreen: true,
    });
    notification.onclick = getNotificationClickHandler(notification, dispatch, evt);
  }
  settings.slackLegacyTokens.filter(t => t.isEnabled).forEach(token => {
    sendSlackStatus(evt, token.value, state);
  });
}

export function stopTimer() {
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
    notifyIfEnabled(stateAtStart, dispatch, 'start');

    let interval;
    const tick = () => {
      const state = getState();
      const { startTime, timerType } = state.timer;
      const {
        sessionLengthMinutes,
        breakLengthMinutes,
      } = state.settings;
      const notify = notifyIfEnabled.bind(null, state, dispatch);
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
