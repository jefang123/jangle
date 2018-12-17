import React from 'react';
import MessageInput from './message_create_container';
const Timestamp =  require('react-timestamp');

class MessageItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickOut = this.handleClickOut.bind(this)
    this.state = {
      showMessageOptions : false, 
    }
    
  }

  contextMenu (e) {
    e.preventDefault();
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteMessage(id);
  }

  handleClickOut () {    
    if (this.props.showMessageOptions) {
      this.props.handleMessageShow(0)
    }
  }

  render () {
    const message = this.props.message 
    let message2;
    if (!message[0]) return null
    let timestamp = <span><Timestamp time={message[0].created_at} format='date'/></span>
    let user = this.props.users[message[0].user_id]
    let jstime = new Date(message[0].created_at)
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (new Date() - jstime <= 86400000) {
      timestamp = <span><Timestamp time={message[0].created_at} format='time'/></span>
    }
    else if ((new Date() - jstime > 86400000) && new Date() - jstime <= 86400000*2 ) {
      timestamp = <span>Yesterday at <Timestamp time={message[0].created_at} format='time'/></span>
    }
    else if ((new Date() - jstime > (86400000*2)) && new Date() - jstime<= (86400000*7)) {
      timestamp = <span>Last {DAYS[jstime.getDay()]} at <Timestamp time={message[0].created_at} format='time'/></span>
    }
  
    if (message.length === 1) {
      let messageb;
      if (message[0].user_id === this.props.currentUser.id) {
        messageb = <p className="delete-message" onClick={()=>this.handleClick(message.id)}>Delete Message</p>
      }

      // <i className="fas fa-ellipsis-v" onclick={ ()=>this.handleEdit() } />
      // <div className={showEdit}>
      //   <p>Update Message</p>
      //   <p>Delete Message</p>
      // </div>
      // if (this.state.edit) {
      //   edit = <input placeholder={message[0].body} />
      // }

      // <p>escape to <span>cancel</span> enter to <span>save</span></p>
      
      let editText;
      if (message[0].created_at !== message[0].updated_at) {
        editText = <span>&nbsp;(edited)</span>
      }
      let messageId = message[0].id;

      let handleEdit = this.props.handleEdit
      let handleMessageShow = this.props.handleMessageShow

      const { edit, showMessageOptions } = this.props
      let showEdit = (messageId === showMessageOptions) ? "show-message-options" : "hidden-message-options"
      
      message2 = <section className="message-item" key={messageId} onClick={()=>this.handleClickOut()}>
                <div className="message-body"> {message[0].body} {editText}</div>

                <i className="fas fa-ellipsis-v" onClick={ ()=>handleMessageShow(messageId) } />
                  <section className={showEdit}>
                    <p onClick={()=>handleEdit(messageId)}>Edit</p>
                    <p onClick={()=>this.handleClick(e)}>Delete</p>
                  </section>

                  {/* <div className={showEdit} onClick={()=>this.handleEdit()}> 
                    {messageb}
                  </div> */}
              </section>
      
      
      if (edit === messageId) {
        message2 = <section className="message-item" key={message[0].id}>
                    <MessageInput handleEdit={handleEdit} messageId={message[0].id} body={message[0].body} channel={this.props.channel} editId="edit"/>
                    <p className="message-edit">escape to <strong>cancel</strong> • enter to <strong>save</strong></p>
        </section>
      }
    
    } else {
      const { edit, showMessageOptions} = this.props
      message2 = this.props.message.map(mess => {

        let showEdit = mess.id === showMessageOptions ? "show-message-options" : "hidden-message-options"

        let messagec;
        if (mess.user_id === this.props.currentUser.id) {
          messagec = <div className="delete-message" onClick={()=>this.handleClick(message.id)}>Delete Message</div>
        }
        return (
          <section className="message-item" key={mess.id} >
            <div className="message-body"> {mess.body} </div>
              <div className={showEdit} onClick={()=>this.handleEdit()}> 
                {messagec}
              </div>
          </section>
        )
      })
   }

   return (
    <div className="message">

        <img className="message-image" src={window.user_url}></img>
        <div className="message-box">
          <p >{user ? user.username : null} {timestamp}</p> 
          {message2}
        </div>
      
    </div>
   )
      
  }
}

export default MessageItem;
