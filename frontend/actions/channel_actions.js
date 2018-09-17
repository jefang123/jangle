import * as APIChannel from '../util/channel_api_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export const receiveChannels = channels => {
  return {
    type: RECEIVE_CHANNELS,
    channels
  };
};

export const removeChannel = (id) => {
  return {
    type: REMOVE_CHANNEL,
    channelId:id
  };
};

export const receiveChannel = channel => {
  return {
    type: RECEIVE_CHANNEL,
    channel
  };
};


export const fetchChannels = () => {
  return dispatch => {
    return APIChannel.fetchChannels().then(
      channels => {
        return dispatch(receiveChannels(channels));
      }
      // errors => {
      //   return dispatch(receiveErrors(errors));
      // }
    );
  };
};

export const fetchchannel = (id) => {
  return dispatch => {
    return APIChannel.fetchChannel(id).then(
      channel => {
        return dispatch(receiveChannel(channel));
      }
    );
  };
};

export const updatechannel = channel => {
  return dispatch => {
    return APIChannel.updatechannel(channel).then(
      channel => {
        return dispatch(receivechannel(channel));
      }
    );
  };
};


export const createchannel = channel => {
  return dispatch => {
    return APIChannel.createchannel(channel).then(
      channel => {
        return dispatch(receivechannel(channel));
      }
    );
  };
};


export const deletechannel = id => {
  return dispatch => {
    return APIChannel.deletechannel(id).then(
      channel => {
        return dispatch(removechannel(id));
      }
    );
  };
};