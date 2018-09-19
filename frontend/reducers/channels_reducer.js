import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../actions/channel_actions";
import { RECEIVE_SERVER } from "../actions/server_actions";
import { merge } from 'lodash';

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SERVER: 
      return action.channels || {}
    case RECEIVE_CHANNELS:
      return action.channels
    case RECEIVE_CHANNEL: 
      return {[action.channel.id]:action.channel}
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
};
