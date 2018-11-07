import { connect } from 'react-redux';
import ServerShow from './server_show';
import { fetchServer } from '../actions/server_actions';
import { logout } from '../actions/session_actions';
import { deleteChannel, fetchChannel } from '../actions/channel_actions';
import { deleteServer, deleteJoin } from '../actions/server_actions';

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    redirect: state.errors.redirect,
    server: state.entities.servers[ownProps.match.params.serverId],
    users: Object.values(state.entities.users),
    channels: Object.values(state.entities.channels),
    currentUser: state.entities.users[state.session.currentUserId]
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServer: id => dispatch(fetchServer(id)),
    deleteServer: id => dispatch(deleteServer(id)),
    logout: () => dispatch(logout()),
    deleteChannel: id => dispatch(deleteChannel(id)),
    removeServer: (id) => dispatch(deleteJoin(id)),
    createChannel: channel => dispatch(createChannel(channel)),
    fetchChannel: id=> dispatch(fetchChannel(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerShow);