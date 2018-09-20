import React from 'react';

class ChannelWebSocket extends React.Component {
  componentDidMount(){
    this.props['data-getChannelData'](this.props['data-ChannelData'].id);
    this.props['data-cableApp'].channel = this.props['data-cableApp'].cable.subscriptions.create({
      channel: "MessageChannel",
      room: this.props['data-ChannelData'].id
    }, {

      received: (newChannel) => {
        this.props.fetchMessages();
      }
    })
  }

  render() {
    return(
      <div />
    )
  }
}

export default ChannelWebSocket;