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

    const sortedMessages = [{ message: [filteredMessages[0]] }];

    for (let index = 1; index < filteredMessages.length; index++) {
      
      let currentMessage = filteredMessages[index]
      let oldMessage = sortedMessages[sortedMessages.length-1].message[0]

      let newId = currentMessage.user_id
      let oldId = oldMessage.user_id

      let newDate = new Date(currentMessage.created_at)
      let oldDate = new Date(oldMessage.created_at)
      if (newId === oldId && newDate.toDateString() === oldDate.toDateString()) {
        sortedMessages[sortedMessages.length-1].message.push(currentMessage)
      } else {
        sortedMessages.push({ message:[currentMessage] })
      }
      
    }

    const messages = this.props.messages.map(message => {
      return <MessageItem 
        message={message.message}
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