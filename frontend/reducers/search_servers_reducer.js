import { SEARCH } from "../actions/search_actions";

export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case SEARCH:
      return action.results
    default:
      return state;
  }
};
