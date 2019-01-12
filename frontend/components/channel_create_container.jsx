import ChannelCreateForm from "./channel_create_form";
import { connect } from 'react-redux';
import { createChannel } from '../actions/channel_actions';
import { withRouter } from 'react-router-dom'
import { fetchUsers } from '../actions/user_actions';

const mapStateToProps = state => {
  return {
    errors: state.errors.channel,
    currentUser: state.entities.users[state.session.currentUserId],
    users2: state.entities.users2,
    names: state.entities.search.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: channel => dispatch(createChannel(channel)),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelCreateForm));
