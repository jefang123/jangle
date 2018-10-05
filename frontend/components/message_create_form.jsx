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
  }

  handleSubmit(e) {
    e.preventDefault();
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

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' 
        value={this.state.body} 
        onChange={this.update('body')}/>
      </form>
    )
  }
}


export default MessageCreateForm;
