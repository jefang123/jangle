class VoiceChannel < ApplicationCable::Channel 
  def subscribed 
    stream_from 'voice_channel'
  end

  def unsubscribed
  end 
end 

# getusermedia API for microphone

# pseudo-code

# set up microphone access via voice channels 
# set up mute/on for voice channels 
# set up actioncable streaming for voice channels in servers 
  # users should be able to listen regardless if the url is or isnt the voice channel