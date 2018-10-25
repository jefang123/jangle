import React from 'react';
import MessageForm from './message_create_container';
import { Redirect } from 'react-router-dom';
import LinkPreview from 'react-native-link-preview';

class ChannelShow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      body: "",
      channel_id: this.props.match.params.channelId,
      typingUsers: {}
    }
  }

  componentDidMount () {
    this.props.fetchMessages();
    this.scrollBottom();
    
  }


  componentDidUpdate(prevProps) {
    if (this.state.typingUsers !== typing) {
      this.setState({
        typingUsers: typing
      })
    }
    if (this.props.match.params.channelId !== prevProps.match.params.channelId) {
      this.props.fetchMessages();
      this.setState({
        channel_id: this.props.match.params.channelId
      })
    }
    this.scrollBottom();
  }

  scrollBottom(){
    if(this.bottom) {
    this.bottom.scrollIntoView();
    }
  }

  handleClick (id) {
    this.props.deleteMessage(id);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.createMessage(this.state)
    this.setState({
      body: ""
    })
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <Redirect to='/' />
      );
    }
    
    if (!this.props.channel) return null;
    let users;
    if (parseInt(this.props.match.params.serverId) === homeId) {
      users = this.props.users2;
    } else {
      users = this.props.users;
    }
    const messages = this.props.messages.map(message => {
      if (!message.id) {
        return null;
      }
      // let body;
      // LinkPreview.getPreview(message.body).then(data =>{
      // })

      let messageb;
      if (message.user_id === this.props.currentUser.id) {
        messageb = <p className="delete-message" onClick={()=>this.handleClick(message.id)}>x</p>
      }

      if (message.channel_id === this.props.channel.id) {
        const user = users[message.user_id];
        return (
           
          <div key={message.id} className="message">
            <div>
              <img className="message-image" src={window.user_url}></img>
            <div className="message-box">
            <p >{user ? user.username : null} <span>{message.created_at}</span></p> 
              

                <p className="message-body"> {message.body}</p>
              
                {messageb}
            </div>
            </div>
            
          </div>
        );
      }
    });

    const { channel } = this.props;
    // let messageLimit = 25
    // let shownMessages = messages.slice()
    let messageheader;
    let header;
    // if (channel.server_id === window.homeId) {
      if (channel.channel_name === this.props.currentUser.username) {
        header = <h3>@ {channel.channel_topic}</h3>
        messageheader =  <h3>This is the beginning of your conversation with {channel.channel_topic} </h3>
      }
      else if (this.props.users2[channel.channel_name]) {
        header = <h3>@ {channel.channel_name}</h3>
        messageheader =  <h3>This is the beginning of your conversation with @{channel.channel_name} </h3>
      } 
    // }
    else {
      header = <h3># {channel.channel_name}<span>{channel.channel_topic}</span></h3>
      messageheader =  <h3>This is the beginning of #{channel.channel_name} </h3>
    }

    let typingUsers= Object.values(typing).filter(id => {id === currentUser.id})
    typingUsers = typingUsers.map(id => {return this.props.users[id]})

    let typingLine =  <p></p>;

    if (typingUsers.length > 2) {
      typingLine = <p>{typingUsers[0].username} and {typingUsers.length-1} others are typing</p>
    } 
    else if (typingUsers.length === 2) {
      typingLine = <p>{typingUsers[0].username} and {typingUsers[1].username} are typing</p>
    } 
    else if (typingUsers.length === 1) {
      typingLine = <p>{typingUsers[0].username} is typing</p>
    }

    return (
      <section>
        <section className='channel-show-heading'> 
          {header}
        </section>
        <div className="divider" />
        <section className='message-index'>
        {messageheader}
        {messages}
        <div ref={(el) => { this.bottom = el; }}></div>
        </section>
        <div className="divider"></div>
        {typingLine}
        <MessageForm channel={channel}/>
      </section>
    )
  }

}


export default ChannelShow;