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

  def typing(data)
    MessageChannel.broadcast_to('message_channel', data)
  end 

  def done(data)
    MessageChannel.broadcast_to('message_channel', data)
  end 

  def speak(data)
    new_message = Message.create(body: data['body'], user_id: data['user_id'], channel_id: data['channel_id'] )
    MessageChannel.broadcast_to('message_channel', new_message)
  end 

  def speak2(data)
    new_channel = Channel.create(channel_name: data['channel_name'], channel_topic: data['channel_topic'], server_id: data['server_id'])
    MessageChannel.broadcast_to('message_channel', new_channel)
  end
  
  def unsubscribed
  end 
end 