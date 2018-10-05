import React from 'react';
import { receiveMessage } from '../actions/message_actions';

class ChannelWebSocket extends React.Component {
  componentDidMount(){
    this.props['data-getChannelData'](this.props['data-ChannelData'].id);
    this.props['data-cableApp'].channel = this.props['data-cableApp'].cable.subscriptions.create({
      channel: "MessageChannel",
      // room: this.props['data-ChannelData'].id
      room: 'MessageRoom'
    }, {

      received: (data) => {
        // debugger
        // this.props.fetchMessages();
        dispatch(receiveMessage(data.messages));
      },

      speak: (data) => {
        return this.perform("speak", data)
      }
    })
  }

  render() {
    return(
      <div />
    )
  }
}

export default ChannelWebSocket;