import * as APIServer from '../util/server_api_util';
import * as APIJoins from '../util/userjoin_api_util';

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';
export const RECEIVE_SERVER_ERRORS = 'RECEIVE_SERVER_ERRORS'
export const RECEIVE_JOIN_ERRORS = 'RECEIVE_JOIN_ERRORS'
export const CREATE_SERVER = 'CREATE_SERVER'
export const RECEIVE_404_ERRORS = 'RECEIVE_404_ERRORS'

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

export const receiveErrors = errors => {
  return {
    type: RECEIVE_SERVER_ERRORS,
    errors
  };
};

export const receive404Errors = errors => {
  return {
    type: RECEIVE_404_ERRORS,
    errors
  };
};

export const receiveJoinErrors = errors => {
  return {
    type: RECEIVE_JOIN_ERRORS,
    errors
  };
};

export const getServer = payload => {
  return {
    type: CREATE_SERVER,
    server: payload.server
  }
}

export const fetchServers = () => {
  return dispatch => {
    return APIServer.fetchServers().then(
      servers => {
        return dispatch(receiveServers(servers));
      }
    );
  };
};

export const fetchServer = (id) => {
  return dispatch => {
    return APIServer.fetchServer(id).then(
      payload => {
        return dispatch(receiveServer(payload));
      },
      errors => {
      return dispatch(receive404Errors(errors.responseJSON));
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
        return dispatch(getServer(server));
      },
      errors => {
        return dispatch(receiveErrors(errors.responseJSON));
      }
    );
  };
};

export const createJoin = join => {
  return dispatch => {
    return APIJoins.createUserJoin(join).then(
      server => {
        return dispatch(fetchServer(join.server_id));
      },
      errors => {
        return dispatch(receiveJoinErrors(errors.responseJSON));
      }
    )
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

export const deleteJoin = id => {
  return dispatch => {
    return APIJoins.deleteUserJoin(id).then(
      server => {
        return dispatch(removeServer(id));
      }
    );
  };
};