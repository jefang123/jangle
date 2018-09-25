import * as APISession from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const login = user => {
  return dispatch => {
    return APISession.login(user).then(
      user => {
        return dispatch(receiveCurrentUser(user));
      },
      err => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};

export const signup = user => {
  return dispatch => {
    return APISession.signup(user).then(
      user => {
        return dispatch(receiveCurrentUser(user));
      },
      err => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};

export const logout = () => {
  return dispatch => {
    return APISession.logout().then(()=>{
      return dispatch(logoutCurrentUser());
    });
  };
};
