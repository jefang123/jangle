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

          // <div key={message.id} className="message">
          //   <div>
          //     <img className="message-image" src={window.user_url}></img>
          //     <div className="message-box">
          //       <p >{user ? user.username : null} {timestamp}</p> 
          //       <section>
          //         <p className="message-body"> {message.body}</p>
          //         {messageb}
          //       </section>
          //     </div>
          //   </div>
            
          // </div>

  // message = <section>
  //             <p className="message-body"> {this.message.body} </p>
  //             {messageb}
  //           </section>

  // message = this.props.message.map(mess => {
  //   <section>
  //     <p className="message-body"> {this.mess.body} </p>
  //     {messageb}
  //   </section>
  // })

  // <div key={message.id} className="message">
  //   <div>
  //     <img className="message-image" src={window.user_url}></img>
  //     <div className="message-box">
  //       <p> {user ? user.username : null} {timestamp}</p>
  //       {message}
  //     </div>
  //   </div>
  // </div>

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

export default MessageItem;
