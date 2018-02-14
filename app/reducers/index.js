import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import menu from './menu';
import settings from './settings';
import timer from './timer';

const rootReducer = combineReducers({
  menu,
  router,
  settings,
  timer,
});

export default rootReducer;
