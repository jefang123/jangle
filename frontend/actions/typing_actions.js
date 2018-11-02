export const ADD_TYPER = 'ADD_TYPER';
export const REMOVE_TYPER = 'REMOVE_TYPER'

export const addTypingUser = typer => {
  return {
    type: ADD_TYPER,
    typer
  };
};

export const removeTypingUser = typer => {
  return {
    type: REMOVE_TYPER,
    typer
  };
};
