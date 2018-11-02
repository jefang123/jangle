import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import serversReducer from './servers_reducer';
import channelsReducer from './channels_reducer';
import messagesReducer from './messages_reducer';
import privateUsersReducer from './private_users_reducer';
import serverJoinsReducer from './serverjoins_reducer';
import typingReducer from './typing_reducer';

export default combineReducers({
  users2: privateUsersReducer,
  users: usersReducer,
  servers: serversReducer,
  servers2: serverJoinsReducer,
  channels: channelsReducer,
  typing: typingReducer,
  messages: messagesReducer
});
