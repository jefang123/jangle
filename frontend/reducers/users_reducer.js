import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_SERVER , CLEAR_STATE} from "../actions/server_actions";
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]:action.currentUser})
    case RECEIVE_SERVER: 
      return action.users
    case CLEAR_STATE: 
      return {};
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};