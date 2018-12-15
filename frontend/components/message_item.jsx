import React from 'react';
import MessageInput from './message_create_container';
const Timestamp =  require('react-timestamp');

class MessageItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {
      showMessageOptions : false, 
      edit : false
    }
  }

  contextMenu (e) {
    e.preventDefault();
  }

  handleMessageShow () {
    let boolean = this.state.showMessageOptions ? false : true
    this.setState({
      showMessageOptions : boolean
    })
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteMessage(id);
  }

  handleEdit () {
    // e.preventDefault();
    let boolean = this.state.edit ? false : true 
    this.setState({
      edit: boolean 
    })
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

    let showEdit = this.state.showMessageOptions ? "show-message-options" : "hidden-message-options";
  
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

      message2 = <section className="message-item" key={message[0].id}  onClick={()=>this.handleEdit()}>
                <div className="message-body"> {message[0].body} </div>

                <i className="fas fa-ellipsis-v" onClick={ ()=>this.handleMessageShow() } />
                  <section className={showEdit}>
                    <p>Edit</p>
                    <p>Delete</p>
                  </section>

                  {/* <div className={showEdit} onClick={()=>this.handleEdit()}> 
                    {messageb}
                  </div> */}
              </section>
      
      // const { edit } = this.state
      
      // if (edit) {
      //   message2 = <section className="message-item" key={message[0].id} onClick={()=>this.handleEdit()}>
      //               <MessageInput body={message[0].body} channel={this.props.channel} editId="edit"/>
      //   </section>
      // }
    
    } else {
      message2 = this.props.message.map(mess => {
        let messagec;
        if (mess.user_id === this.props.currentUser.id) {
          messagec = <div className="delete-message" onClick={()=>this.handleClick(message.id)}>Delete Message</div>
        }
        return (
          <section className="message-item" key={mess.id} onClick={(e)=>console.log(e.key)}>
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
