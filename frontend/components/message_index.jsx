import React from 'react';
import MessageItem from './message_item';

class MessageIndex extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    this.props.deleteMessage(id);
  }

  render () {
    const filteredMessages = this.props.messages.filter(message => {
      if (message.channel_id === this.props.channel.id) {
        return message
      }
    })

    const messages = this.props.messages.map(message => {
      return <MessageItem 
        message={message}
        channel={this.props.channel}
        deleteMessage={this.props.deleteMessage}
        currentUser={this.props.currentUser} 
        />
    })
    
    return (
      <>
        {messages}
      </>
    );
  }
}

export default MessageIndex;