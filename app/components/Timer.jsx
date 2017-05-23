// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styles from './Timer.css';
import type { timerStateType } from '../reducers/types/timer-state-type';

const Timer = (props: {
  startTimer: () => void,
  stopTimer: () => void,
  timer: timerStateType}) => {
  const { startTimer, stopTimer, timer } = props;
  let remaining = 'Not Started';
  if (timer.startTime) {
    const endTime = timer.startTime.clone().add(timer.duration);
    const now = moment();
    let diffMs = endTime.diff(now);

    // No time below 0
    if (diffMs < 0) {
      diffMs = 0;
    }

    remaining = moment(diffMs).format('mm:ss.SSS');
  }
  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to="/">
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={`counter ${styles.counter}`} data-tid="timer">
        {remaining}
      </div>
      <div className={styles.btnGroup}>
        <button className={styles.btn} onClick={startTimer} data-tclass="btn">
          <i className="fa fa-plus" />
        </button>
        <button className={styles.btn} onClick={stopTimer} data-tclass="btn">
          <i className="fa fa-minus" />
        </button>
      </div>
    </div>
  );
};

export default Timer;
