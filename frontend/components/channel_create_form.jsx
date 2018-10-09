import React from 'react';

class ChannelCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel_name: "",
      server_id: this.props.match.params.serverId,
      channel_topic: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.processForm(this.state);
    App.cable.subscriptions.subscriptions[0].speak(this.state);
    this.setState({
      channel_name: "",
      channel_topic: ""
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.errors !== nextProps.errors) {
      if (nextProps.errors.length < 1) {
        this.props.handleClose();
      }
    }
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }
  render () {
    const errors = this.props.errors.map((errors, idx) => {
      return (
        <p key={idx} >
          {errors}
        </p>
      )
    })
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Create Channel</h3>
        <div className="errors" >
          {errors}
        </div>
          <input 
          type='text' 
          value={this.state.channel_name} 
          placeholder="Channel Name"
          onChange={this.update('channel_name')}/>
          <input 
          type='text' 
          value={this.state.channel_topic} 
          placeholder="Channel Topic"
          onChange={this.update('channel_topic')}/>
        <button className="create-channel">Create Channel!</button>
      </form>
    )
  }
}


export default ChannelCreateForm;
