import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_SERVER, CLEAR_STATE } from "../../actions/server_actions";
import { merge } from 'lodash';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SERVER: 
      return action.channels || {}
    case CLEAR_STATE:
      return {}
    case RECEIVE_CHANNELS:
      return action.channels
    case RECEIVE_CHANNEL: 
      return merge({},state,{[action.channel.id]:action.channel})
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
