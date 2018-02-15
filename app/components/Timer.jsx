import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Timer.css';
import {
  SESSION_TIMER,
  BREAK_TIMER,
} from '../constants/timerType';

const Timer = props => {
  const { startTimer, stopTimer, timer, durationMinutes } = props;
  let remaining = 'Not Started';
  const duration = moment.duration(durationMinutes, 'minutes');
  if (timer.startTime) {
    const endTime = timer.startTime.clone().add(duration);
    const now = moment();
    let diffMs = endTime.diff(now);

    // No time below 0
    if (diffMs < 0) {
      diffMs = 0;
    }

    remaining = moment(diffMs).format('mm:ss.SSS');
  } else if (duration) {
    remaining = moment.utc(duration.asMilliseconds()).format('mm:ss.SSS');
  }

  let subheader = null;
  let button = null;
  if (!timer.startTime) {
    button = <RaisedButton label="Start Session" onClick={startTimer} primary />;
    subheader = 'Start Next Pomodoro';
  } else if (timer.timerType === SESSION_TIMER) {
    button = <RaisedButton label="Cancel Session" onClick={stopTimer} secondary />;
    subheader = 'Pomodoro In Progress';
  } else {
    button = <RaisedButton label="Cancel Break" onClick={stopTimer} secondary />;
    subheader = 'Break In Progress';
  }

  return (
    <div className={styles.container}>
      <h1>Timer</h1>
      <h3>{subheader}</h3>
      <Paper className={styles.paper} zDepth={3}>
        <div className={`counter ${styles.counter}`} data-tid="timer">
          {remaining}
        </div>
        <div className={styles.btnGroup}>
          {button}
        </div>
      </Paper>
    </div>
  );
};

Timer.propTypes = {
  startTimer: React.PropTypes.func.isRequired,
  stopTimer: React.PropTypes.func.isRequired,
  timer: React.PropTypes.shape({
    startTime: React.PropTypes.object,
    timerType: React.PropTypes.oneOf([SESSION_TIMER, BREAK_TIMER]),
  }).isRequired,
  durationMinutes: React.PropTypes.number.isRequired,
};

export default Timer;
