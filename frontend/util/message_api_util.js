export const fetchMessages = (data) => {
  return $.ajax({
    method: 'GET',
    url: 'api/messages',
    data
  });
};

export const fetchMessage = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/messages/${id}`
  });
};

export const createMessage = (message) => {
  return $.ajax({
    method: 'POST',
    url: 'api/messages',
    data: {message}
  });
};

export const updateMessage = message => {
  return $.ajax({
    method: 'GET',
    url: `api/messages/${message.id}`,
    data: {message}
  });
};

export const deleteMessage = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/messages/${id}`
  });
};
