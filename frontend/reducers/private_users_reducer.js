import { RECEIVE_USERS } from "../actions/user_actions";
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};