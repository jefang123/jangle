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
      <section className="channel-edit">
        <section className="channel-options">
          <p></p>
          <p>Overview</p>
          <p>Delete Channel</p>
        </section>
        <section className="channel-details">
          <input></input>
          <input></input>
          <button></button>
        </section>
      </section>
    )
  }
}

export default ChannelEdit;