import React from 'react';
import MessageForm from './message_create_container';
import { Redirect } from 'react-router-dom';
import MessageIndex from './message_index';
import TypingUsers from './typing_users';

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
    if(this.bottom ) {
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
        users={users}
        channel={this.props.channel} 
        messages={this.props.messages}
        currentUser={this.props.currentUser}
        deleteMessage={this.props.deleteMessage}
      />

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

    return (
      <>
        <section className='channel-show-heading'> 
          {header}
        </section>
        <section className='message-index'>
        <br />
        {messageheader}
        <br />
        {messages2}
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