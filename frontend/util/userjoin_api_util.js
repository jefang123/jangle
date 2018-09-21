export const createUserJoin = join => {
  return $.ajax({
    method: 'POST',
    url: 'api/userjoins',
    data: {join}
  });
};

export const deleteUserJoin = (server_id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/userjoins/${server_id}`,
    data: { server_id }
  });
};
