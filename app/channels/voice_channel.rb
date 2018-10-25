class VoiceChannel < ApplicationCable::Channel 
  def subscribed 
    stream_from 'voice_channel'
  end

  def unsubscribed
  end 
end 

# getusermedia API for microphone