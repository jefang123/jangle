import React from 'react';

class ChannelEdit extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      channel_name : this.props.channel_name,
      channel_topic : this.props.channel_topic
    }
  }

  render () {
    return (
      <section className="channel-edit">TEST</section>
    )
  }
}

export default ChannelEdit;