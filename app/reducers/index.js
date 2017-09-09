// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import timer from './timer';
import type timerStateType from './types/timer-state-type';

export type stateType = {
  timer: timerStateType,
};

const rootReducer = combineReducers({
  router,
  timer,
});

export default rootReducer;
