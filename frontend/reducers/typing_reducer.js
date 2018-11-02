import { ADD_TYPER, REMOVE_TYPER } from '../actions/typing_actions';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_TYPER:
      return {
        currentUserId: action.currentUser.id
      };
    case REMOVE_TYPER:
      return defaultState;
    default:
      return state;
  }
};
