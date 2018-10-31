import React from 'react';

const mapStateToProps = state => {
  return {
    errors: state.errors.channel,
    currentUser: state.entities.users[state.session.currentUserId],
    users2: state.entities.users2
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: channel => dispatch(createChannel(channel))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelCreateForm));