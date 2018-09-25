import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import channel from './channel_errors_reducer';

export default combineReducers({
  session,
  channel
});
