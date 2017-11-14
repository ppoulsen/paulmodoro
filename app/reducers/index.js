import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import timer from './timer';
import menu from './menu';

const rootReducer = combineReducers({
  router,
  timer,
  menu,
});

export default rootReducer;
