export const signup = user => {
  return dispatch => {
    return APISession.signup(user).then(
      user => {
        return dispatch(receiveCurrentUser(user));
    });
  };
};

export const logout = () => {
  return dispatch => {
    return APISession.logout().then(()=>{
      return dispatch(logoutCurrentUser());
    });
  };
};