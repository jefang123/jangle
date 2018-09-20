class Api::MessagesController < ApplicationController 
  def index 
    @messages = Message.all
  end
  
  def show 
    @message = Message.find_by(id: params[:id])
  end 
  
  def update
    @message = Message.find_by(id: params[:id])  
    if @message.update(message_params)
      render :show 
    else
      render json: @message.errors.full_messages, status: 422
    end
  end 
  
  def destroy 
    message = Message.find_by(id: params[:id])
    message.destroy
    render json: {}
  end 
  

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      @channel = @message.channel
      MessageChannel.broadcast_to(@channel, {channel: @channel, messages:@channel.messages})
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end
  
  def message_params 
    params.require(:message).permit(:body, :channel_id)
  end 
end 
