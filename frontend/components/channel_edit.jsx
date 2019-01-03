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
          <h6>#GENERAL</h6>
          <p className="ch-edit-selected">Overview</p>
          <div className="divider"></div>
          <p className="ch-edit-delete">Delete Channel</p>
        </section>
        <section className="channel-details">
          <div>
            <button>X</button>
            <p>ESC</p>
          </div>
          <input 
            placeholder={this.state.channel_name}
          />
          <input 
            placeholder={this.state.channel_topic}
          />
        </section>
      </section>
    )
  }
}

export default ChannelEdit;