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
  
  def update(data)
    field = data["field"]
    id = data["id"]
    chunk = data["data"]
    current_item = field.capitalize.constantize.find(id)
    current_item.update(chunk)
    MessageChannel.broadcast_to('message_channel', current_item)
  end 

  def delete(data)
    field = data["field"]
    id = data["id"]
    field.capitalize.constantize.destroy(id)
    MessageChannel.broadcast_to('message_channel', {delete: data["field"], id: id})
  end

  def join(data)
    UserJoin.create(server_id: data['server_id'], user_id: data['user_id'])
    joined_server = Server.find(data['server_id'])
    server_hash = {
      id: joined_server.id, 
      server_name: joined_server.server_name,
      creator_id: joined_server.creator_id,
      private: joined_server.private,
      user_ids: joined_server.user_ids
    }
    new_data = { user_id: data['user_id'], server: server_hash, channels: joined_server.channels, users: joined_server.users }
    MessageChannel.broadcast_to('message_channel', new_data)
  end 

  def unsubscribed
  end 
end 