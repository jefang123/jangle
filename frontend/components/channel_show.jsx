import React from 'react';
import MessageForm from './message_create_container';
import { Redirect } from 'react-router-dom';
import MessageIndex from './message_index';
import TypingUsers from './typing_users';
import LinkPreview from 'react-native-link-preview';

const Timestamp =  require('react-timestamp');

class ChannelShow extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      body: "",
      channel_id: this.props.match.params.channelId
    }
  }

  componentDidMount () {
    this.props.fetchMessages();
    this.scrollBottom();
    
  }


  componentDidUpdate(prevProps) {
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

  handleScroll (){
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
    if (parseInt(this.props.match.params.serverId) === window.homeId) {
      users = this.props.users2;
    } else {
      users = this.props.users;
    }

    let messages2 = 
      <MessageIndex 
        users={this.props.users}
        channel={this.props.channel} 
        messages={this.props.messages}
        currentUser={this.props.currentUser}
        deleteMessage={this.props.deleteMessage}
      />
    if (this.props.channel.server_id === window.homeId) {
      messages2 = 
      <MessageIndex
        users={this.props.users2}
        channel={this.props.channel}
        messages={this.props.messages}
        currentUser={this.props.currentUser}
        deleteMessage={this.props.deleteMessage}
      />
    }
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

    const messages = this.props.messages.map(message => {
      if (!message.id) {
        return null;
        //return <Loading /> ?
      }
      // LinkPreview.getPreview(message.body).then(data =>{
      // })
      let messageb;
      if (message.user_id === this.props.currentUser.id) {
        messageb = <p className="delete-message" onClick={()=>this.handleClick(message.id)}>x</p>
      }

      let timestamp = <span><Timestamp time={message.created_at} format='date'/></span>
      let jstime = new Date(message.created_at)
      const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      if (new Date() - jstime <= 86400000) {
        timestamp = <span><Timestamp time={message.created_at} format='time'/></span>
      }
      else if ((new Date() - jstime > 86400000) && new Date() - jstime <= 86400000*2 ) {
        timestamp = <span>Yesterday at <Timestamp time={message.created_at} format='time'/></span>
      }
      else if ((new Date() - jstime > (86400000*2)) && new Date() - jstime<= (86400000*7)) {
        timestamp = <span>Last {DAYS[jstime.getDay()]} at <Timestamp time={message.created_at} format='time'/></span>
      }



      if (message.channel_id === this.props.channel.id) {
        const user = users[message.user_id];
        return (
           
          <div key={message.id} className="message">
            <div>
              <img className="message-image" src={window.user_url}></img>
            <div className="message-box">
            <p >{user ? user.username : null} {timestamp}</p> 
              
                <section>
                  <p className="message-body"> {message.body}</p>
                
                  {messageb}
                </section>
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

    // <MessageItem key={message.id} channel={channel} />
    return (
      <>
        <section className='channel-show-heading'> 
          {header}
        </section>
        <section className='message-index'>
        <br />
        {messageheader}
        {messages}
        <div ref={(el) => { this.bottom = el; }}></div>
        </section>
        <div className="full-white-divider"></div>
          <TypingUsers users={users} currentUser={this.props.currentUser}/>
        <MessageForm channel={channel}/>
      </>
    )
  }

}


export default ChannelShow;