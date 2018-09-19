import React from 'react';


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
          <div>

            <p key={message.id}>{message.body}</p>
            <button onClick={()=>this.handleClick(message.id)}>x</button>
          </div>
        );
      }
    });
    const { channel } = this.props;
    return (
      <section className='channel-show'>
        <section className='channel-show-heading'> 

          <h3>{channel.channel_name}</h3>

          <div className="divider"></div>
        </section>
        <section className='message-index' id="chat">

        {messages}
        </section>
        <div className="divider"></div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' 
           value={this.state.body} 
           onChange={this.update('body')}/>
        </form>
      </section>
    )
  }

}


export default ChannelShow;