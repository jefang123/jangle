import ChannelCreateForm from "./channel_create_form";
import { connect } from 'react-redux';
import { createChannel } from '../actions/channel_actions';
import { fetchServer } from '../actions/server_actions';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    errors: state.errors,
    currentUser: state.entities.users[state.session.currentUserId],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: channel => dispatch(createChannel(channel))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelCreateForm));
