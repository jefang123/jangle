import React from 'react';
import ChannelIndexItem from './channel_index_item';

class ChannelIndex extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showOptions : 0
    }
    this.handleOptions = this.handleOptions.bind(this);
  }

  handleOptions (id) {
    let { showOptions } = this.state;
    let newOptions = showOptions ? 0 : id;
    this.setState({
      showOptions : newOptions
    })
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
        showOptions = {this.state.showOptions}
        handleOptions = {this.handleOptions}
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
