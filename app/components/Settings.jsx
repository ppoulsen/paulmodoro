import React from 'react';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
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
    soundEnabled: React.PropTypes.bool,
    notificationsEnabled: React.PropTypes.bool,
  };

  static defaultProps = {
    breakLengthMinutes: 5,
    sessionLengthMinutes: 25,
    soundEnabled: true,
    notificationsEnabled: true,
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

  getSessionLength = () => this.state.sessionLengthMinutes
      || this.props.sessionLengthMinutes
      || 25;

  getBreakLength = () => this.state.breakLengthMinutes
      || this.props.breakLengthMinutes
      || 5;

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
      </div>
    );
  }
}

export default Settings;
