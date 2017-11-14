import {
  TOGGLE_MENU,
} from '../actions/menu';

export default function timer(state = {
  isOpen: false,
}, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
