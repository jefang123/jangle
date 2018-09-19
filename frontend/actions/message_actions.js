import * as APIMessage from '../util/message_api_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const receiveMessages = messages => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  };
};

export const removeMessage = (id) => {
  return {
    type: REMOVE_MESSAGE,
    messageId:id
  };
};

export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
};


export const fetchMessages = () => {
  return dispatch => {
    return APIMessage.fetchMessages().then(
      messages => {
        return dispatch(receiveMessages(messages));
      }
      // errors => {
      //   return dispatch(receiveErrors(errors));
      // }
    );
  };
};

export const fetchMessage = (id) => {
  return dispatch => {
    return APIMessage.fetchMessage(id).then(
      message => {
        return dispatch(receiveMessage(message));
      }
    );
  };
};

export const updateMessage = message => {
  return dispatch => {
    return APIMessage.updateMessage(message).then(
      message => {
        return dispatch(receiveMessage(message));
      }
    );
  };
};


export const createMessage = message => {
  return dispatch => {
    return APIMessage.createMessage(message).then(
      message => {
        return dispatch(receiveMessage(message));
      }
    );
  };
};


export const deleteMessage = id => {
  return dispatch => {
    return APIMessage.deleteMessage(id).then(
      message => {
        return dispatch(removeMessage(id));
      }
    );
  };
};