export const SEARCH = "SEARCH";

const receiveSearch = (results) => {
  return {
    type: SEARCH,
    results
  };
}

export const search = (results) => {
  return dispatch => {
    return dispatch(receiveSearch(results))
  }
}