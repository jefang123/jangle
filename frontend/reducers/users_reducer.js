import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_SERVER } from "../actions/server_actions"
import { merge } from 'lodash';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {[action.currentUser.id]:action.currentUser}
    case RECEIVE_SERVER: 
      return action.server.users
    default:
      return state;
  }
};
