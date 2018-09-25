import { RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS } from '../actions/session_actions';

// const defaultState = {
//   currentUserId: null
// };

export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return [];
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    default:
      return state;
  }
};
