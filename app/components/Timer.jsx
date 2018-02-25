import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Timer.css';
import {
  SESSION_TIMER,
  BREAK_TIMER,
} from '../constants/timerType';

const Timer = props => {
  const { startTimer, cancelTimer, timer, durationMinutes } = props;
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

  let subheader = null;
  let button = null;
  if (!timer.startTime) {
    button = <RaisedButton label="Start Session" onClick={startTimer} primary />;
    subheader = 'Start Next Pomodoro';
  } else if (timer.timerType === SESSION_TIMER) {
    button = <RaisedButton label="Cancel Session" onClick={cancelTimer} secondary />;
    subheader = 'Pomodoro In Progress';
  } else {
    button = <RaisedButton label="Cancel Break" onClick={cancelTimer} secondary />;
    subheader = 'Break In Progress';
  }

  return (
    <div className={styles.container}>
      <h1>Timer</h1>
      <h3>{subheader}</h3>
      <Paper className={styles.paper} zDepth={3}>
        <LinearProgress mode="determinate" value={percentage} />
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
  startTimer: PropTypes.func.isRequired,
  cancelTimer: PropTypes.func.isRequired,
  timer: PropTypes.shape({
    startTime: PropTypes.object,
    timerType: PropTypes.oneOf([SESSION_TIMER, BREAK_TIMER]),
  }).isRequired,
  durationMinutes: PropTypes.number.isRequired,
};

export default Timer;
