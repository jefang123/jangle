import React from 'react';

class MessageItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  contextMenu (e) {
    e.preventDefault();
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteMessage(id);
  }

  render () {
    let messageb;
    if (message.user_id === this.props.currentUser.id) {
      messageb = <p className="delete-message" onClick={()=>this.handleClick(message.id)}>x</p>
    }
    return (
      <div key ={message.id} className="message">
        <img className="message-image" src={window.user_url}></img>
        <div className="message-box">
          <div>
            <p>{user ? user.username : null} <span>{message.created_at}</span></p>
            <p className="message-body">{message.body}</p>
            {messageb}
          </div>
        </div>
      </div>
    );
  }
}

{/* <MessageItem 
  currentUser = {this.props.currentUser}
  message = {message}
  channel = {this.props.channel}
/> */}

{/* <MessageIndex
  messages = {this.props.messages}
/> */}

// filter through users in messageindex, then send filtered results to MessageItem
// messageitem then renders messages based on each user/time?




export default MessageItem;
