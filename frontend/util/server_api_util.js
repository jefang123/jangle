export const fetchServers = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/servers'
  });
};

export const fetchServer = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/servers/${id}`
  });
};

export const createServer = (server) => {
  return $.ajax({
    method: 'POST',
    url: 'api/servers',
    data: {server}
  });
};

export const updateServer = server => {
  return $.ajax({
    method: 'GET',
    url: `api/session/${server.id}`,
    data: {server}
  });
};

export const deleteServer = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/servers/${id}`
  });
};
