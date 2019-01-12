export const SEARCH_SERVERS = "SEARCH_SERVERS";
export const SEARCH_USERS = "SEARCH_USERS";

const receiveServersSearch = (results) => {
  return {
    type: SEARCH_SERVERS,
    results
  };
}

const receiveUsersSearch = (results) => {
  return {
    type: SEARCH_USERS,
    results
  };
}

export const searchServers = (results) => {
  return dispatch => {
    return dispatch(receiveServersSearch(results))
  }
}

export const searchUsers = (results) => {
  return dispatch => {
    return dispatch(receiveUsersSearch(results))
  }
}