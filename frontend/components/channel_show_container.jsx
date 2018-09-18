import { connect } from 'react-redux';
import ChannelShow from './channel_show';
import { fetchChannel, deleteChannel } from '../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId],
    users: Object.values(state.entities.users)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChannel: id => dispatch(fetchChannel(id)),
    deleteChannel: id => dispatch(deleteChannel(id))
  }
}

// const mapDispatchToProps = dispatch => ({
//   fetchChannel(id) { dispatch(fetchChannel(id))},
//   deleteChannel(id) { dispatch(deleteChannel(id))}
// })

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow);