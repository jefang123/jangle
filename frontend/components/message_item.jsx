import React from 'react';
const Timestamp =  require('react-timestamp');

class MessageItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {
      edit : false
    }
  }

  contextMenu (e) {
    e.preventDefault();
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteMessage(id);
  }

  handleEdit (e) {
    e.preventDefault();
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

    let showEdit = this.state.edit ? "show-edit-message" : "hidden-edit-message";
  
    if (message.length === 1) {
      let messageb;
      if (message[0].user_id === this.props.currentUser.id) {
        messageb = <p className="delete-message" onClick={()=>this.handleClick(message.id)}>Delete Message</p>
      }
      message2 = <section id="message-item" key={message[0].id}>
                <div className="message-body"> {message[0].body} </div>
                  <div className="" onClick={()=>this.handleEdit()}> 
                    {messageb}
                  </div>
              </section>
    
    } else {
      message2 = this.props.message.map(mess => {
        let messagec;
        if (mess.user_id === this.props.currentUser.id) {
          messagec = <div className="delete-message" onClick={()=>this.handleClick(message.id)}>Delete Message</div>
        }
        return (
          <section id="message-item" key={mess.id}>
            <div className="message-body"> {mess.body} </div>
              <div className="" onClick={()=>this.handleEdit()}> 
                {messagec}
              </div>
          </section>
        )
      })
   }

   return (
    <div className="message">
      <div>
        <img className="message-image" src={window.user_url}></img>
        <div className="message-box">
          <p >{user ? user.username : null} {timestamp}</p> 
          {message2}
        </div>
      </div>
    </div>
   )
      
  }
}

export default MessageItem;
