import React from 'react';
import ChannelIndexItem from './channel_index_item';

class ChannelIndex extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render () {
    let channels = this.props.channels.map(channel =>{
      return (
        <ChannelIndexItem
        key={channel.id} 
        channel={channel}
        server={this.props.server}
        currentUser={this.props.currentUser}
        length={this.props.channels.length}
        />
      )
    })
    return (
      <ul>
        {channels}
      </ul>
    )
  }
}

export default ChannelIndex;
