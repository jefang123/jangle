import React from 'react';
import MessageForm from './message_create_container';
import { Redirect } from 'react-router-dom';
import LinkPreview from 'react-native-link-preview';

class ChannelShow extends React.Component {
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
    if (this.props.channel.private) {
      users = this.props.users2;
    } else {
      users = this.props.users;
    }
    const messages = this.props.messages.map(message => {

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
            <p >{user.username} <span>{message.created_at}</span></p> 
              

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
    if (channel.server_id === window.homeId) {

      if (channel.channel_name === this.props.currentUser.username) {
        header = <h3>@ {channel.creator}</h3>
        messageheader =  <h3>This is the beginning of your conversation with {channel.channel_topic} </h3>
      }
      else if (this.props.users2[channel.channel_name]) {
        header = <h3>@ {channel.channel_name}</h3>
        messageheader =  <h3>This is the beginning of your conversation with @{channel.channel_name} </h3>
      } 
    }
    else {
      header = <h3># {channel.channel_name}<span>{channel.channel_topic}</span></h3>
      messageheader =  <h3>This is the beginning of #{channel.channel_name} </h3>
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
        
        <MessageForm channel={channel}/>
      </section>
    )
  }

}


export default ChannelShow;