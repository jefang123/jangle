export const RECEIVE_ALL_SERVERS = 'RECEIVE_ALL_SERVERS';

export const receiveAllServers = servers => {
  return {
    type: RECEIVE_ALL_SERVERS,
    servers
  };
};

export const fetchAllServers = () => {
  return dispatch => {
    return APIServer.fetchServers().then(
      servers => {
        return dispatch(receiveAllServers(servers));
      }
    );
  };
};