import React from 'react';
import MessageForm from './message_create_container';
import { Redirect } from 'react-router-dom';
import { receiveMessage } from '../actions/message_actions'

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
    App.cable.subscriptions.create({
      channel: "MessageChannel",
      room: 'MessageRoom'
    }, {

      received: (data) => {
        // this.props.fetchMessages();

        if(data.id){
            let date = new Date();
            let ampm = " AM"
            let hours = date.getHours();
            if (hours === 0) {
              hours = 12;
            } else if ( hours > 12 ) {
              hours -= 12;
              ampm = " PM" 
            }
            let minutes = date.getMinutes();
            if (hours < 10 ) {
              hours = `0${hours}:`
            } else {
              hours = `${hours}:`
            }
    
            if (minutes < 10 ) {
              minutes = `0${minutes}`;
            } else {
              minutes = `${minutes}`
            }
            let time = hours + minutes + ampm
            data.created_at = time 
            dispatch(receiveMessage(data));
          }
        },

      speak: function(data) {
        return this.perform("speak", data)
      }
    })
  
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
    const users = this.props.users2;
    const messages = this.props.messages.map(message => {
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
    let header;
    if (channel.channel_name === this.props.currentUser.username) {
      header = <h3>@ {channel.creator}</h3>
    }
    else if (channel.private) {
      header = <h3>@ {channel.channel_name}</h3>
    } 
    else {
      header = <h3># {channel.channel_name}<span>{channel.channel_topic}</span></h3>
    }
    return (
      <section>
        <section className='channel-show-heading'> 

          {header}
        </section>
        <div className="divider" />
        <section className='message-index'>

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