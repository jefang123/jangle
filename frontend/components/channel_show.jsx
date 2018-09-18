import React from 'react';

class ChannelShow extends React.Component {
  componentDidMount () {
    this.props.fetchChannel(this.props.match.params.channelId);
  }

  componentWillUpdate(newProps) {
    if (this.props.match.params.channelId != newProps.match.params.channelId) {
      this.props.fetchChannel(newProps.match.params.channelId)
    }
  }

  render() {
    if (!this.props.channel) return null;
    const users = this.props.users.map(user => {
      return (
        <p key={user.id}>{user.username}</p>
      );
    });
    const { channel } = this.props;
    return (
      <section className='channel-show'>
        <h3>{channel.channel_name}</h3>
        <div className="divider"></div>
        MessageApp
      </section>
    )
  }

}

export default ChannelShow;