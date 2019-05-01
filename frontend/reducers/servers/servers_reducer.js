import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER, CREATE_SERVER, CLEAR_STATE, ADD_SERVER } from "../../actions/server_actions";
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { merge } from 'lodash';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SERVERS:
      return action.servers
    case CREATE_SERVER:
      return merge({}, state, {[action.server.id]:action.server})
    case RECEIVE_SERVER: 
      return _.merge({}, state, {[action.server.id]:action.server})
      // recursively merge incase of updates
    case ADD_SERVER: 
      return _.merge({}, state, {[action.server.id]:action.server})
      // this case does not hit channels or users reducer
    case REMOVE_SERVER:
      const newState = merge({}, state);
      delete newState[action.serverId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
