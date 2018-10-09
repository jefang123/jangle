class MessageBroadcastJob < ApplicationJob
  queue_as :default 

  def perform(message)
    MessageChannel.broadcast_to('message_channel', message: render_message(message)) 
  end 

  private
  def render_message(message)
    ApplicationController.renderer.render(partial: "api/messages/_message", locals: { message:message })
  end 
  
end 