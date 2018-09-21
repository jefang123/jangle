import { connect } from 'react-redux';
import ServerShow from './server_show';
import { fetchServer } from '../actions/server_actions';
import { logout } from '../actions/session_actions';
import { deleteChannel, fetchChannel } from '../actions/channel_actions';
import { deleteServer } from '../actions/server_actions';
import * as APIJoins from '../util/userjoin_api_util';

const mapStateToProps = (state, ownProps) => {
  return {
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
    removeServer: (server_id) => dispatch(APIJoins.deleteUserJoin(server_id)),
    fetchChannel: id=> dispatch(fetchChannel(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerShow);