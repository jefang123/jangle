import { RECEIVE_SERVER_ERRORS, RECEIVE_SERVER, CREATE_SERVER } from '../actions/server_actions';
import { CLEAR_ERRORS } from '../actions/session_actions';

export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case CREATE_SERVER:
      return [];
    case RECEIVE_SERVER:
      return [];
    case RECEIVE_SERVER_ERRORS:
      return action.errors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
