import React from 'react';

class ChannelEdit extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      channel_name : this.props.channel.channel_name,
      channel_topic : this.props.channel.channel_topic
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleExit(e) {
    const {channel, handleOptions} = this.props;

    if(e.keyCode === 27) {
      handleOptions(channel.id)
    } 
  }

  handleSave() {
    let id = this.props.channel.id;
    App.cable.subscriptions.subscriptions[0].update({field:"channel", id, data:this.state});
    this.props.handleOptions(id);
  }

  handleReset() {
    this.setState({
      channel_name : this.props.channel.channel_name,
      channel_topic : this.props.channel.channel_topic
    });
  }

  handleChange(field) {
    debugger
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
      // let props = Object.keys(this.props.users2)
      // this.names = props.filter(prop=> this.props.users2[prop].username.includes(`${this.state.channel_name}`))
      // this.names = this.names.filter(name => this.props.users2[name].id !== this.props.currentUser.id)
      // if (e.target.innerText = "") {
      //   this.names = [];
      // }
    };
  }

  render () {
    const {channel, handleOptions, handleDeleteCh} = this.props;
    let text;
    if (!channel.channel_topic) {
      text = "No topic set."
    }

    let showCaution = "hidden-caution";
    if ((this.state.channel_name !== channel.channel_name) || (this.state.channel_topic !== channel.channel_topic)) {
      showCaution = "show-caution";
    }

    return (
      <section className="channel-edit" tabIndex="0" onKeyDown={(e)=>this.handleExit(e)}>
        <section className="channel-options">
          <h6>#GENERAL</h6>
          <p className="ch-edit-selected">Overview</p>
          <div className="divider"></div>
          <p className="ch-edit-delete" onClick={()=>handleDeleteCh(channel.id)}>Delete Channel</p>
        </section>
        <main>
          <section className="channel-details">
            <h3>OVERVIEW</h3>
            <label>CHANNEL NAME</label>
              <input 
                value={this.state.channel_name}
                onChange={this.handleChange('channel_name')}
              />
            
            <label>CHANNEL TOPIC</label>
              <input 
                placeholder={text || this.state.channel_topic}
                value={this.state.channel_topic}
                onChange={this.handleChange('channel_topic')}
              />


            <div className="divider"/>

            <i  />

            <div className={showCaution}>
              <p>Careful - you have unsaved changes! </p>
              <div>
                <p onClick={()=>this.handleReset()}>Reset</p>
                <button onClick={()=>this.handleSave()}>Save Changes</button>
              </div>
            </div>
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