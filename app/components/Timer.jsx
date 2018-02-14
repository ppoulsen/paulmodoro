import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Timer.css';

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
  const button = !timer.startTime
    ? <RaisedButton label="Start" onClick={startTimer} primary />
    : <RaisedButton label="Reset" onClick={stopTimer} secondary />;
  return (
    <div className={styles.container}>
      <h1>Timer</h1>
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

export default Timer;
