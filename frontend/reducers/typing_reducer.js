import { ADD_TYPER, REMOVE_TYPER } from '../actions/typing_actions';
import { merge } from 'lodash';

export default (state={}, action) => {
  debugger
  Object.freeze(state);
  switch (action.type) {
    case ADD_TYPER:
      return merge({},state,{[action.message.id]:action.message})
    case REMOVE_TYPER:
      const newState = merge({}, state);
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
};
