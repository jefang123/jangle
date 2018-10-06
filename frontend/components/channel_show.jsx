import React from 'react';
import MessageForm from './message_create_container';
import ChannelWebSocket from './channel_web_socket';
import actionCable from 'actioncable';
import { Redirect } from 'react-router-dom';
import { receiveMessage } from '../actions/message_actions'


// const CableApp = {};
// CableApp.cable = 
// actionCable.createConsumer()

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
      // room: this.props['data-ChannelData'].id
      room: 'MessageRoom'
    }, {

      received: (data) => {
        // debugger
        // this.props.fetchMessages();
        dispatch(receiveMessage(data));
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
    const users = this.props.users;
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
    return (
      <section>
        <section className='channel-show-heading'> 

          <h3># {channel.channel_name}<span>{channel.channel_topic}</span></h3>
        </section>
        <div className="divider" />
        <section className='message-index'>

        {messages}
        <div ref={(el) => { this.bottom = el; }}></div>
        </section>
        <div className="divider"></div>
        
        {/* <ChannelWebSocket
            data-cableApp={CableApp}
            data-ChannelData={this.props.channel}
            data-getChannelData={this.props.fetchChannel}
            // fetchMessages={this.props.fetchMessages}
          /> */}
        <MessageForm channel={channel}/>
      </section>
    )
  }

}


export default ChannelShow;


           
//   <div key={message.id} className="message">
//     <p >{user.username}</p>
//     <div>
//       <p>{message.body}</p>
//       <p className="delete-message" onClick={()=>this.handleClick(message.id)}>x</p>
//     </div>
//   </div>
// );