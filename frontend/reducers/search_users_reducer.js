import { SEARCH_USERS } from "../actions/search_actions";

export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case SEARCH_USERS:
      return action.results
    default:
      return state;
  }
};