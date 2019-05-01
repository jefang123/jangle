import { connect } from 'react-redux';
import ChannelShow from './channel_show';
import { fetchChannel, deleteChannel } from '../../actions/channel_actions';
import { createMessage, fetchMessages, deleteMessage } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId],
    messages: Object.values(state.entities.messages),
    users: state.entities.users,
    users2: state.entities.users2,
    currentUser: state.entities.users[state.session.currentUserId]
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChannel: id => dispatch(fetchChannel(id)),
    deleteChannel: id => dispatch(deleteChannel(id)),
    fetchMessages: () => dispatch(fetchMessages()),
    deleteMessage: id => dispatch(deleteMessage(id)),
    createMessage: message => dispatch(createMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow);