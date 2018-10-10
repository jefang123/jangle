import { RECEIVE_ALL_SERVERS } from "../actions/userjoin_actions";

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_SERVERS:
      return action.servers
    default:
      return state;
  }
};