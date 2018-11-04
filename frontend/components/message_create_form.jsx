import React from 'react';

class MessageCreateForm extends React.PureComponent {
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
      if (this.state.body === "") {
        e.preventDefault();
      } else {
        this.handleSubmit();
      }
    }
  }

  update(field) {
    if (this.state.body.length > 0) {
    }
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  render () {
    let text;
    if (this.props.channel.channel_name === this.props.currentUser.username) {
      text = `@${this.props.channel.channel_topic}`
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
        placeholder = {`Message ${text}`}
        onChange={this.update('body')}/>
        
      </form>
    )
  }
}

export default MessageCreateForm;
