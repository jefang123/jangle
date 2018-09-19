import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from "../actions/server_actions";
import { merge } from 'lodash';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SERVERS:
      return action.servers
    case RECEIVE_SERVER: 
      return merge({}, state, {[action.server.id]:action.server})
    case REMOVE_SERVER:
      const newState = merge({}, state);
      delete newState[action.serverId];
      return newState;
    default:
      return state;
  }
};
