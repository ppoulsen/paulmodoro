import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AutoComplete from 'material-ui/AutoComplete';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Timer.css';
import {
  SESSION_TIMER,
  BREAK_TIMER,
} from '../constants/timerType';

export default class Timer extends React.Component {
  static propTypes = {
    startTimer: PropTypes.func.isRequired,
    cancelTimer: PropTypes.func.isRequired,
    updateTimerDescription: PropTypes.func.isRequired,
    timer: PropTypes.shape({
      startTime: PropTypes.object,
      timerType: PropTypes.oneOf([SESSION_TIMER, BREAK_TIMER]),
    }).isRequired,
    durationMinutes: PropTypes.number.isRequired,
  }

  // TODO: Actually generate these from past ones
  getAutoCompleteDescriptions = () => this.defaultDescriptions;
  defaultDescriptions = [];

  renderButton = () => {
    const { timer, startTimer, cancelTimer } = this.props;
    if (!timer.startTime) {
      return <RaisedButton label="Start Session" onClick={startTimer} primary />;
    } else if (timer.timerType === SESSION_TIMER) {
      return <RaisedButton label="Cancel Session" onClick={cancelTimer} secondary />;
    }

    return <RaisedButton label="Cancel Break" onClick={cancelTimer} secondary />;
  };

  renderSubHeader = () => {
    const { timer } = this.props;
    if (!timer.startTime) {
      return 'Start Next Pomodoro';
    } else if (timer.timerType === SESSION_TIMER) {
      return 'Pomodoro In Progress';
    }
    return 'Break In Progress';
  };

  renderDescription = () => {
    const { timer, updateTimerDescription } = this.props;
    const hasDescription = timer.description && timer.description.length;
    if (timer.startTime) return hasDescription ? <h2>{timer.description}</h2> : null;
    return (
      <AutoComplete
        floatingLabelText="Description"
        filter={AutoComplete.fuzzyFilter}
        dataSource={this.getAutoCompleteDescriptions()}
        maxSearchResults={5}
        onUpdateInput={updateTimerDescription}
      />
    );
  };

  render() {
    const { timer, durationMinutes } = this.props;
    let remaining = 'Not Started';
    const duration = moment.duration(durationMinutes, 'minutes');
    let percentage = 0;
    if (timer.startTime) {
      const endTime = timer.startTime.clone().add(duration);
      const now = moment();
      let diffMs = endTime.diff(now);

      // No time below 0
      if (diffMs < 0) {
        diffMs = 0;
      }

      const durationMs = durationMinutes * 60 * 1000;
      percentage = ((durationMs - diffMs) / durationMs) * 100;
      remaining = moment(diffMs).format('mm:ss.SSS');
    } else if (duration) {
      remaining = moment.utc(duration.asMilliseconds()).format('mm:ss.SSS');
    }

    return (
      <div className={styles.container}>
        <h1>Timer</h1>
        <h3>{this.renderSubHeader()}</h3>
        <Paper className={styles.paper} zDepth={3}>
          {this.renderDescription()}
          <LinearProgress mode="determinate" value={percentage} />
          <div className={`counter ${styles.counter}`} data-tid="timer">
            {remaining}
          </div>
          <div className={styles.btnGroup}>
            {this.renderButton()}
          </div>
        </Paper>
      </div>
    );
  }
}
