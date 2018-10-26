import React from 'react';
import { Link, withRouter, matchPath } from 'react-router-dom';

class MessageItem extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  contextMenu (e) {
    e.preventDefault();
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteMessage(id);
  }

  render () {
  }
}

export default withRouter(MessageItem);


// let messageb;
// if (message.user_id === this.props.currentUser.id) {
//   messageb = <p className="delete-message" onClick={()=>this.handleClick(message.id)}>x</p>
// }

// if (message.channel_id === this.props.channel.id) {
//   const user = users[message.user_id];
//   return (
     
//     <div key={message.id} className="message">
//       <div>
//         <img className="message-image" src={window.user_url}></img>
//       <div className="message-box">
//       <p >{user ? user.username : null} <span>{message.created_at}</span></p> 
        

//           <p className="message-body"> {message.body}</p>
        
//           {messageb}
//       </div>
//       </div>
      
//     </div>
//   );
// }
// });