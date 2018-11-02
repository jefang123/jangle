export const ADD_TYPER = 'ADD_TYPER';
export const REMOVE_TYPER = 'REMOVE_TYPER'

const addTypingUser = typer => {
  return {
    type: ADD_TYPER,
    typer
  };
};

const removeTypingUser = typer => {
  return {
    type: REMOVE_TYPER,
    typer
  };
};

export const addTyper = typer => {
  return dispatch => {
    return dispatch(addTypingUser(typer));
  }
}

export const removeTyper = typer => {
  return dispatch => {
    return dispatch(removeTypingUser(typer));
  }
}
