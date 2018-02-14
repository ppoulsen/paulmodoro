import React from 'react';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import styles from './Settings.css';

class Settings extends React.Component {
  static propTypes = {
    breakLengthMinutes: React.PropTypes.number,
    sessionLengthMinutes: React.PropTypes.number,
    setSessionLengthMinutes: React.PropTypes.func.isRequired,
    setBreakLengthMinutes: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    breakLengthMinutes: 5,
    sessionLengthMinutes: 25,
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
      </div>
    );
  }
}

export default Settings;
