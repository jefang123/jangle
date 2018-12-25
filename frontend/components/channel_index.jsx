import React from 'react';

class ChannelIndex extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render () {
    let channels = this.props.channels.map(channel =>{
      return (
        <ChannelIndexItem 
        channel={channel}
        server={this.props.server}
        currentUser={this.props.currentUser}
        />
      )
    })
    return (
      {channels}
    )
  }
}

export default ChannelIndex;
