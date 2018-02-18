import React from 'react';
import { shell } from 'electron';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import styles from './Settings.css';

class Settings extends React.Component {
  static propTypes = {
    breakLengthMinutes: React.PropTypes.number,
    sessionLengthMinutes: React.PropTypes.number,
    setSessionLengthMinutes: React.PropTypes.func.isRequired,
    setBreakLengthMinutes: React.PropTypes.func.isRequired,
    setSoundEnabled: React.PropTypes.func.isRequired,
    setNotificationsEnabled: React.PropTypes.func.isRequired,
    setSlackLegacyTokens: React.PropTypes.func.isRequired,
    soundEnabled: React.PropTypes.bool,
    notificationsEnabled: React.PropTypes.bool,
    slackLegacyTokens: React.PropTypes.arrayOf(React.PropTypes.shape({
      isEnabled: React.PropTypes.bool,
      value: React.PropTypes.string,
    })),
  };

  static defaultProps = {
    breakLengthMinutes: 5,
    sessionLengthMinutes: 25,
    soundEnabled: true,
    notificationsEnabled: true,
    slackLegacyTokens: [],
  };

  state = {
    breakLengthMinutes: null,
    sessionLengthMinutes: null,
  };

  onSessionLengthChange = (evt, newValue) => {
    this.sessionLengthMinutes = newValue;
    this.setState({ sessionLengthMinutes: newValue });
  };

  onSessionLengthSave = () => {
    this.props.setSessionLengthMinutes(this.sessionLengthMinutes);
    this.setState({ sessionLengthMinutes: null });
  };

  onBreakLengthChange = (evt, newValue) => {
    this.breakLengthMinutes = newValue;
    this.setState({ breakLengthMinutes: newValue });
  };

  onBreakLengthSave = () => {
    this.props.setBreakLengthMinutes(this.breakLengthMinutes);
    this.setState({ breakLengthMinutes: null });
  };

  onSoundToggled = (e, isInputChecked) => {
    this.props.setSoundEnabled(isInputChecked);
  };

  onNotificationsToggled = (e, isInputChecked) => {
    this.props.setNotificationsEnabled(isInputChecked);
  };

  onSlackLegacyTokenChanged = (index, newValue) => {
    const nextTokens = [...this.props.slackLegacyTokens];
    if (index >= nextTokens.length) {
      nextTokens.push({
        value: newValue,
        isEnabled: true,
      });
    } else if (!newValue || !newValue.length) {
      nextTokens.splice(index, 1);
    } else {
      nextTokens[index] = {
        ...nextTokens[index],
        value: newValue,
      };
    }
    this.props.setSlackLegacyTokens(nextTokens);
  };

  onSlackLegacyEnabledChanged = (index, isEnabled) => {
    const nextTokens = [...this.props.slackLegacyTokens];
    nextTokens[index] = {
      ...nextTokens[index],
      isEnabled,
    };
    this.props.setSlackLegacyTokens(nextTokens);
  };

  getSessionLength = () => this.state.sessionLengthMinutes
      || this.props.sessionLengthMinutes
      || 25;

  getBreakLength = () => this.state.breakLengthMinutes
      || this.props.breakLengthMinutes
      || 5;

  getSlackLegacyAccessTokenInputs = () => {
    const inputs = this.props.slackLegacyTokens.map((token, i) => (
      /* eslint-disable react/no-array-index-key */
      <div key={i} className={styles.slackToken}>
        <div>
          <TextField
            floatingLabelText="Slack Legacy Access Token"
            value={token.value}
            style={{ marginTop: '-16px' }}
            onChange={(e, newValue) => this.onSlackLegacyTokenChanged(i, newValue)}
          />
        </div>
        <div>
          <Toggle
            toggled={token.isEnabled}
            onToggle={(e, isInputChecked) => this.onSlackLegacyEnabledChanged(i, isInputChecked)}
          />
        </div>
      </div>
      /* eslint-enable react/no-array-index-key */
    ));
    inputs.push(
      <div key={inputs.length}>
        <div>
          <TextField
            floatingLabelText="Slack Legacy Access Token"
            value=""
            style={{ marginTop: '-16px' }}
            onChange={(e, newValue) => this.onSlackLegacyTokenChanged(inputs.length, newValue)}
          />
        </div>
      </div>,
    );
    return inputs;
  };

  openSlackTokenPage = () => {
    shell.openExternal('https://api.slack.com/custom-integrations/legacy-tokens');
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Settings</h1>
        <h2>Sessions</h2>
        <Divider />
        <p className={styles.fieldTitle}>Session Length</p>
        <p>{this.getSessionLength()} Minutes(s)</p>
        <Slider
          defaultValue={25}
          min={1}
          max={90}
          step={1}
          value={this.getSessionLength()}
          onChange={this.onSessionLengthChange}
          onDragStop={this.onSessionLengthSave}
        />
        <h2>Breaks</h2>
        <Divider />
        <p className={styles.fieldTitle}>Break Length</p>
        <p>{this.getBreakLength()} Minutes(s)</p>
        <Slider
          defaultValue={5}
          min={1}
          max={30}
          step={1}
          value={this.getBreakLength()}
          onChange={this.onBreakLengthChange}
          onDragStop={this.onBreakLengthSave}
        />
        <h2>Notifications</h2>
        <Divider />
        <div className={styles.toggleContainer}>
          <Toggle
            label="Sounds"
            toggled={this.props.soundEnabled}
            onToggle={this.onSoundToggled}
          />
        </div>
        <div className={styles.toggleContainer}>
          <Toggle
            label="Notifications"
            toggled={this.props.notificationsEnabled}
            onToggle={this.onNotificationsToggled}
          />
        </div>
        <h2>Slack Integration</h2>
        <Divider />
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <p>Get a legacy Slack token <a className="pseudoLink" onClick={this.openSlackTokenPage}>here</a></p>
        {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        {this.getSlackLegacyAccessTokenInputs()}
      </div>
    );
  }
}

export default Settings;
