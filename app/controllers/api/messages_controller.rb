class Api::MessagesController < ApplicationController 
  def index 
    @messages = Message.all
  end
  
  def show 
    @message = Message.find_by(id: params[:id])
  end 
  
  def update
    messages = Message.includes(:channel)
    @message = messages.find_by(id: params[:id])
    if @message.update(message_params)
      @channel = @message.channel
      MessageChannel.broadcast_to('message_channel', {channel: @channel, messages:@channel.messages})
      render :show 
    else
      render json: @message.errors.full_messages, status: 422
    end
  end 
  
  def destroy 
    messages = Message.includes(:channel)
    message = messages.find_by(id: params[:id])
    @channel = message.channel
    message.destroy
    MessageChannel.broadcast_to('message_channel', {channel: @channel, messages:@channel.messages})
    render json: {}
  end 
  
  # 88 charas

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      @channel = @message.channel
      # MessageChannel.broadcast_to('message_channel', {channel: @channel, messages:@channel.messages})
      MessageChannel.broadcast_to('message_channel', {channel: @channel, messages:@message})
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end
  
  def message_params 
    params.require(:message).permit(:body, :channel_id)
  end 
end 
