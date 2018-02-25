import moment from 'moment-timezone';

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

function getNotificationClickHandler(notification, startTimer, evt) {
  return () => {
    notification.close();
    if (evt === 'break-over') {
      startTimer();
    }
  };
}

export function sendSlackStatus(evt, token, state) {
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

export function notifyIfEnabled(state, startTimer, evt) {
  const { settings } = state;
  if (settings.soundEnabled) {
    new Audio(`paulmodoro://static/audio/${evt}.mp3`).play();
  }
  if (settings.notificationsEnabled && eventShouldNotify(evt)) {
    const notification = new Notification(getNotificationTitle(evt), {
      body: getNotificationBody(evt, settings),
      noscreen: true,
    });
    notification.onclick = getNotificationClickHandler(notification, startTimer, evt);
  }
  settings.slackLegacyTokens.filter(t => t.isEnabled).forEach(token => {
    sendSlackStatus(evt, token.value, state);
  });
}
