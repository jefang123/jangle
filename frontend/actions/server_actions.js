import * as APIServer from '../util/server_api_util';

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';

export const receiveServers = servers => {
  return {
    type: RECEIVE_SERVERS,
    servers
  };
};

export const removeServer = (id) => {
  return {
    type: REMOVE_SERVER,
    serverId:id
  };
};

export const receiveServer = payload => {
  return {
    type: RECEIVE_SERVER,
    server: payload.server,
    channels: payload.channels,
    users: payload.users
  };
};


export const fetchServers = () => {
  return dispatch => {
    return APIServer.fetchServers().then(
      servers => {
        return dispatch(receiveServers(servers));
      }
      // errors => {
      //   return dispatch(receiveErrors(errors));
      // }
    );
  };
};

export const fetchServer = (id) => {
  return dispatch => {
    return APIServer.fetchServer(id).then(
      payload => {
        return dispatch(receiveServer(payload));
      }
    );
  };
};

export const updateServer = server => {
  return dispatch => {
    return APIServer.updateServer(server).then(
      server => {
        return dispatch(receiveServer(server));
      }
    );
  };
};


export const createServer = server => {
  return dispatch => {
    return APIServer.createServer(server).then(
      server => {
        return dispatch(receiveServer(server));
      }
    );
  };
};


export const deleteServer = id => {
  return dispatch => {
    return APIServer.deleteServer(id).then(
      server => {
        return dispatch(removeServer(id));
      }
    );
  };
};