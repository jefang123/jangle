import { RECEIVE_404_ERRORS, RECEIVE_SERVER } from "../actions/server_actions";

export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SERVER:
      return [];
    case RECEIVE_404_ERRORS:
      return action.errors
    default:
      return state;
  }
};