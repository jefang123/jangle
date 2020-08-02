import { RECEIVE_MESSAGES, RECEIVE_MESSAGE, REMOVE_MESSAGE } from "../../actions/message_actions";
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { merge } from 'lodash';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
  
    case RECEIVE_MESSAGES:
      return merge({},state, action.messages)
    case RECEIVE_MESSAGE: 
      return merge({},state,{[action.message.id]:action.message})
    case REMOVE_MESSAGE:
      const newState = merge({}, state);
      delete newState[action.messageId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};