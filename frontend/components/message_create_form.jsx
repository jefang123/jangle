import React from 'react';

class MessageCreateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body || "",
      channel_id: this.props.match.params.channelId,
      user_id: this.props.currentUser.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyDown = this.keyDown.bind(this)
    this.editId = this.props.editId || "chat"
    this.id = this.props.messageId
  }

  handleSubmit(e) {
    let handleEdit = this.props.handleEdit;
    if (this.editId !== "chat") {
      App.cable.subscriptions.subscriptions[0].update({field:"message", id:this.id, data:this.state})
      App.cable.subscriptions.subscriptions[0].done({ username:this.props.currentUser.username, channel_id: this.state.channel_id })
      handleEdit(0)
    } else {
      App.cable.subscriptions.subscriptions[0].speak(this.state);
      this.setState({
        body: "",
      });
    }

  }
  
  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.setState({
        channel_id: this.props.match.params.channelId
      })
    }
  }

  keyDown(e) {
    let handleEdit = this.props.handleEdit;
    if (e.keyCode === 13) {
      if (this.state.body === "") {
        e.preventDefault();
      } else {
        this.handleSubmit();
      }
    }

    if (this.editId !== "chat" && e.keyCode === 27 ) {
      handleEdit(0)
      this.setState({
        body: this.props.body
      })
    }
  }

  update(field) {
    const { currentUser } = this.props;
    // if (this.state.body.length > 0) {
    // }
    return (e) => {
      if (this.editId === "chat") {
        if (e.target.value === "") {
          App.cable.subscriptions.subscriptions[0].done({ username:currentUser.username, channel_id: this.state.channel_id  });
        } else {
          App.cable.subscriptions.subscriptions[0].typing({ username:currentUser.username, channel_id: this.state.channel_id  });
        }
      }
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

    let placeholderText = ""
    if (this.editId === "chat") {
      placeholderText = `Message ${text}`
    }

    return (
      <form>
        <textarea
        onKeyDown = {this.keyDown}
        id = {this.editId}
        rows= "1"
        className= "message-field"
        value={this.state.body} 
        placeholder = {placeholderText} 
        onChange={this.update('body')}/>        
      </form>
    )
  }
}

export default MessageCreateForm;
