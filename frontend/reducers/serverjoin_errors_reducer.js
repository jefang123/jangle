import { RECEIVE_JOIN_ERRORS } from "../actions/server_actions";

export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_JOIN_ERRORS:
      return action.errors
    default:
      return state;
  }
};