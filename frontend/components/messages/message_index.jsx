import React from 'react';
import MessageItem from './message_item';

class MessageIndex extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      edit: 0,
      showMessageOptions : 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleMessageShow = this.handleMessageShow.bind(this)
  }

  handleMessageShow (messageId) {
    const { showMessageOptions } = this.state

    let boolean;
    if (showMessageOptions) {
      boolean = showMessageOptions === messageId ? 0 : messageId 
    } else {
      boolean = messageId
    }
    this.setState({
      showMessageOptions : boolean
    })
  }

  handleEdit (messageId) {
    // e.preventDefault();
    const { edit } = this.state.edit

    let boolean;
    if (edit) {
      boolean = edit === messageId ? 0 : messageId 
    } else {
      boolean = messageId
    }
    this.setState({
      edit: boolean,
      showMessageOptions: 0 
    })
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
    
    if (!sortedMessages[0].message[0]) return null
    const messages = sortedMessages.map(message => {
      return <MessageItem 
        users={this.props.users}
        message={message.message}
        channel={this.props.channel}
        deleteMessage={this.props.deleteMessage}
        currentUser={this.props.currentUser} 
        key={message.message[0].id}
        handleEdit= {this.handleEdit}
        handleMessageShow={this.handleMessageShow}
        edit = {this.state.edit}
        showMessageOptions = {this.state.showMessageOptions}
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