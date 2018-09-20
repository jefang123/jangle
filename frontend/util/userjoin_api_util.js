export const createUserJoin = join => {
  return $.ajax({
    method: 'POST',
    url: 'api/userjoins',
    data: {join}
  });
};

export const deleteUserJoin = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/userjoins/${id}`
  });
};
