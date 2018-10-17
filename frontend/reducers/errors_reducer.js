import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import channel from './channel_errors_reducer';
import server from './server_errors_reducer';
import join from './serverjoin_errors_reducer';
import redirect from './404_reducer';

export default combineReducers({
  session,
  server,
  join,
  redirect, 
  channel
});
