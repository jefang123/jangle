class MessageChannel < ApplicationCable::Channel 
  def subscribed 
    @channel = Channel.find_by(id: params[:room])
    stream_for @channel
  end

  def received(data)
    Messagechannel.broadcast_to({channel: @channel, messages:
    @channel.messages})
  end 
  
  def unsubscribed
  end 
end 