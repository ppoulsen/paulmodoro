import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import history from './history';
import menu from './menu';
import settings from './settings';
import timer from './timer';

const rootReducer = combineReducers({
  history,
  menu,
  router,
  settings,
  timer,
});

export default rootReducer;
