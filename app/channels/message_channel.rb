class MessageChannel < ApplicationCable::Channel 
  def subscribed 

    stream_from "channel"
  end 
end 