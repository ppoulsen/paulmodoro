import Store from 'electron-store';

const config = new Store({
  defaults: {
    settings: {
      sessionLengthMinutes: 25,
      breakLengthMinutes: 5,
      soundEnabled: true,
      notificationsEnabled: true,
      slackLegacyTokens: [],
    },
  },
  name: 'paulmodoro-settings',
});

export default config;
