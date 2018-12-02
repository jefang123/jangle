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
   const message = this.props.message 
      
  }
}

export default MessageItem;
