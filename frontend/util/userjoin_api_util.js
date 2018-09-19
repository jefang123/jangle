export const createUserJoin = join => {
  return $.ajax({
    method: 'POST',
    url: 'api/userjoins',
    data: {join}
  });
};

export const deleteUserJoin = () => {
  return $.ajax({
    method: 'DELETE',
    url: 'api/userjoins'
  });
};
