import { connect } from 'react-redux';
import { fetchServers, createServer} from '../actions/server_actions';
import ServerIndex from './server_index';
import { withRouter } from 'react-router-dom'
import { fetchServer } from '../actions/server_actions';
import { logout } from '../actions/session_actions';

const mapStateToProps = state => ({
  servers: Object.values(state.entities.servers),
  currentUser: state.entities.users[state.session.currentUserId]
});

const mapDispatchToProps = dispatch => ({
  fetchServers: () => dispatch(fetchServers()),
  createServer: server=>dispatch(createServer(server)),
  fetchServer: (id) => dispatch(fetchServer(id)),
  logout: () => dispatch(logout()) 
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerIndex));