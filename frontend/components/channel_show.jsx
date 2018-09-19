import React from 'react';
import MessageForm from './message_create_container';

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
  }


  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.props.fetchMessages();
      this.setState({
        channel_id: this.props.match.params.channelId
      })
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
    if (!this.props.channel) return null;
    const messages = this.props.messages.reverse().map(message => {
      if (message.channel_id === this.props.channel.id) {
        return (
          <div key={message.id}>

            <p >{message.body}</p>
            <p className="delete-message" onClick={()=>this.handleClick(message.id)}>x</p>
          </div>
        );
      }
    });
    const { channel } = this.props;
    return (
      <section className='channel-show'>
        <section className='channel-show-heading'> 

          <h3># {channel.channel_name}<span>{channel.channel_topic}</span></h3>
        </section>
          <div className="divider"></div>
        <section className='message-index' id="chat">

        {messages}
        </section>
        <div className="divider"></div>
        <MessageForm />
      </section>
    )
  }

}


export default ChannelShow;