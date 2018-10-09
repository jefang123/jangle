import React from 'react';

class MessageCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      channel_id: this.props.match.params.channelId,
      user_id: this.props.currentUser.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyDown = this.keyDown.bind(this)
  }

  handleSubmit(e) {
    // e.preventDefault();
    // this.props.processForm(this.state);
    App.cable.subscriptions.subscriptions[0].speak(this.state);
    this.setState({
      body: "",
    });
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.setState({
        channel_id: this.props.match.params.channelId
      })
    }
  }

  keyDown(e) {
    if (e.keyCode === 13) {
      this.handleSubmit();
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
    let text;
    if (this.props.channel.channel_name === this.props.currentUser.username) {
      text = `@${this.props.channel.creator}`
    }
    else if (this.props.channel.private) {
      text = `@${this.props.channel.channel_name}`
    } 
    else {
      text = `#${this.props.channel.channel_name}`
    }
    return (
      <form>
        <textarea
        onKeyDown = {this.keyDown}
        id = "chat"
        rows= "1"
        className= "message-field"
        value={this.state.body} 
        // placeholder={`Message #${this.props.channel.channel_name}`}
        placeholder = {`Message ${text}`}
        onChange={this.update('body')}/>
        
      </form>
    )
  }
}

// documentgetElement.onkeyup = enter;    
// function enter(e) {if (e.which == 13) submitForm();}

export default MessageCreateForm;
