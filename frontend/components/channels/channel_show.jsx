import React from 'react';
import MessageForm from '../messages/message_create_container';
import { Redirect } from 'react-router-dom';
import MessageIndex from '../messages/message_index';
import TypingUsers from '../typing_users';

class ChannelShow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      body: "",
      channel_id: this.props.match.params.channelId
    }
  }

  componentDidMount () {
    const channel_id = this.props.match.params.channelId
    if (channel_id) this.props.fetchMessages({channel_id});
  }


  componentDidUpdate(prevProps) {
    if (this.props.match.params.channelId !== prevProps.match.params.channelId) {
      this.props.fetchMessages({channel_id: this.props.match.params.channelId});
      this.setState({
        channel_id: this.props.match.params.channelId
      })
    }

    this.scrollBottom();
  }

  scrollBottom(){
    if(this.bottom ) {
      this.bottom.scrollIntoView();
    }
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

    let messages = 
      <MessageIndex 
        users={users}
        channel={this.props.channel} 
        messages={this.props.messages}
        currentUser={this.props.currentUser}
        deleteMessage={this.props.deleteMessage}
      />

    const { channel } = this.props;
  
    let messageheader;
    let header;
    if (channel.server_id === window.homeId) {
      if (channel.channel_name === this.props.currentUser.username) {
        header = <h3>@ {channel.channel_topic}</h3>
        messageheader =  <h3>This is the beginning of your direct message history with {channel.channel_topic} </h3>
      }
      else {
        header = <h3>@ {channel.channel_name}</h3>
        messageheader =  <h3>This is the beginning of your direct message history with @{channel.channel_name} </h3>
      } 
    }
    else {
      header = <h3># {channel.channel_name}<span>{channel.channel_topic.slice(0, 100)}</span></h3>
      messageheader =  <h3>Welcome to the beginning of the #{channel.channel_name} channel </h3>
    }
    return (
      <>
        <section className='channel-show-heading'> 
          {header}
        </section>
        <section className='message-index'>
        <br />
        {messageheader}
        <br />
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