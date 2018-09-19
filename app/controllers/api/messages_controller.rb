class Api::MessageController < ApplicationController 
  def index 
    @channel = Channel.find_by(params[:channel_id])
    @messages = @channel.messages
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
    @message.channel_id = params[:channel_id]
    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end
  
  def message_params 
    params.require(:message).permit(:message_body)
  end 
end 
