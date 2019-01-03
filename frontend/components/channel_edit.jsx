import React from 'react';

class ChannelEdit extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      channel_name : this.props.channel_name,
      channel_topic : this.props.channel_topic
    }
    
  }

  handleExit(e) {
    const {channel, handleOptions} = this.props;

    if(e.keyCode === 27) {
      handleOptions(channel.id)
    } 
  }

  render () {
    const {channel, handleOptions} = this.props;

    return (
      <section className="channel-edit" tabIndex="0" onKeyDown={(e)=>this.handleExit(e)}>
        <section className="channel-options">
          <h6>#GENERAL</h6>
          <p className="ch-edit-selected">Overview</p>
          <div className="divider"></div>
          <p className="ch-edit-delete">Delete Channel</p>
        </section>
        <section className="channel-details">
          <div className="escape">
            <button onClick={()=>{handleOptions(channel.id)}}>X</button>
            <p>ESC</p>
          </div>
          <label>CHANNEL NAME</label>
            <input 
              placeholder={this.state.channel_name}
            />
          
          <label>CHANNEL TOPIC</label>
            <input 
              placeholder={this.state.channel_topic}
            />


          <div className="divider"/>

          <i  />
        </section>
      </section>
    )
  }
}

export default ChannelEdit;