import { combineReducers } from 'redux';
import searchServer from './search_servers_reducer';

export default combineReducers({
  servers: searchServer
})