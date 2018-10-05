class MessageChannel < ApplicationCable::Channel 
  def subscribed 
    # @channel = Channel.find_by(id: params[:room])
    # stream_for @channel
    stream_for 'message_channel'
  end

  def received(data)
    # Messagechannel.broadcast_to({channel: @channel, messages:
    # @channel.messages})
  end 

  def speak(data)
    new_message = Message.create(body: data['body'], user_id: data['user_id'], channel_id: data['channel_id'] )
    MessageChannel.broadcast_to('message_channel', new_message)
  end 
  
  def unsubscribed
  end 
end 