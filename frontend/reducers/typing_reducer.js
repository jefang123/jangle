import { ADD_TYPER, REMOVE_TYPER } from '../actions/typing_actions';
import { merge } from 'lodash';

export default (state={}, action) => {
  const data = action.typer 
  Object.freeze(state);
  switch (action.type) {
    case ADD_TYPER:
      const newState = merge({}, state)
      if (!state[data.channel_id]) {
        newState[data.channel_id] = [];
      }
      if (!newState[data.channel_id].includes(data.username)){
        newState[data.channel_id].push(data.username);
      }
      return newState
    case REMOVE_TYPER:
      const nextState = merge({}, state);
      const typingArray = state[data.channel_id].filter(item => item !== data.username);
      nextState[data.channel_id] = typingArray
      return nextState;
    default:
      return state;
  }
};
