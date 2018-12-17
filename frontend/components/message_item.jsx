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

  handleClick (id) {
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
      let editText, editable;
      let messageId = message[0].id;

      let handleEdit = this.props.handleEdit
      let handleMessageShow = this.props.handleMessageShow

      const { edit, showMessageOptions } = this.props
      let showEdit = (messageId === showMessageOptions) ? "show-message-options" : "hidden-message-options"
      if (message[0].created_at !== message[0].updated_at) {
        editText = <span>&nbsp;(edited)</span>
      }

      if (message[0].user_id === this.props.currentUser.id) {
        editable = <> <i className="fas fa-ellipsis-v" onClick={ ()=>handleMessageShow(messageId) } />
                  <section className={showEdit}>
                    <p onClick={()=>handleEdit(messageId)}>Edit</p>
                    <p onClick={()=>this.handleClick(messageId)}>Delete</p>
                  </section> </>
      }
      
      message2 = <section className="message-item" key={messageId}>
                  <div className="message-body"> {message[0].body} {editText}</div>
                  {editable}                  
                </section>
      
      
      if (edit === messageId) {
        message2 = <section className="message-item" key={message[0].id}>
                    <MessageInput handleEdit={handleEdit} messageId={messageId} body={message[0].body} channel={this.props.channel} editId="edit"/>
                    <p className="message-edit">escape to <strong>cancel</strong> • enter to <strong>save</strong></p>
                  </section>
      }
    
    } else {
      const { edit, showMessageOptions, handleEdit, handleMessageShow } = this.props
   
      message2 = this.props.message.map(mess => {

        let showEdit = mess.id === showMessageOptions ? "show-message-options-item" : "hidden-message-options"
        let editText, editable;
        if (mess.created_at !== mess.updated_at) {
          editText = <span>&nbsp;(edited)</span>
        }
        if (mess.user_id === this.props.currentUser.id) {
          editable = <> 
                       <i className="fas fa-ellipsis-v" onClick={ ()=>handleMessageShow(mess.id) } />
                        <section className={showEdit}>
                          <p onClick={()=>handleEdit(mess.id)}>Edit</p>
                          <p onClick={()=>this.handleClick(mess.id)}>Delete</p>
                        </section> 
                     </>
        }
        if (edit === mess.id) {
          return (
            <section className="message-item" key={mess.id} onClick={()=>this.handleClickOut()}>
              <MessageInput handleEdit={handleEdit} messageId={mess.id} body={mess.body} channel={this.props.channel} editId="edit"/>
              <p className="message-edit">escape to <strong>cancel</strong> • enter to <strong>save</strong></p>
            </section>
          )
        } else {
          return (
            <section className="message-item" key={mess.id} onClick={()=>this.handleClickOut()}>
              <div className="message-body"> {mess.body} {editText}</div>
              {editable}
            </section>
          )
        }
      })
   }

   return (
    <div className="message" onClick={()=>this.handleClickOut()}>

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
