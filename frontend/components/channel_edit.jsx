import React from 'react';

class ChannelEdit extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      channel_name : this.props.channel.channel_name,
      channel_topic : this.props.channel.channel_topic
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
    let text;
    if (!channel.channel_topic) {
      text = "No topic set."
    }

    return (
      <section className="channel-edit" tabIndex="0" onKeyDown={(e)=>this.handleExit(e)}>
        <section className="channel-options">
          <h6>#GENERAL</h6>
          <p className="ch-edit-selected">Overview</p>
          <div className="divider"></div>
          <p className="ch-edit-delete">Delete Channel</p>
        </section>
        <main>
          <section className="channel-details">
            <h3>OVERVIEW</h3>
            <label>CHANNEL NAME</label>
              <input 
                value={this.state.channel_name}
              />
            
            <label>CHANNEL TOPIC</label>
              <input 
                placeholder={text || this.state.channel_topic}
                value={this.state.channel_topic}
              />


            <div className="divider"/>

            <i  />
          </section>
          <section>
            <div className="escape">
                <button onClick={()=>{handleOptions(channel.id)}}>X</button>
                <p>ESC</p>
            </div>
          </section>
        </main>
      </section>
    )
  }
}

export default ChannelEdit;