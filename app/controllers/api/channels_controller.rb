class Api::ChannelsController < ApplicationController 
  def index 
    @server = Server.find_by(params[:server_id])
    @channels = @server.channels
  end
  
  def show 
    @channel = Channel.find_by(id: params[:id])
  end 
  
  def update
    @channel = Channel.find_by(id: params[:id])  
    if @channel.update(channel_params)
      render :show 
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end 
  
  def destroy 
    channel = Channel.find_by(id: params[:id])
    channel.destroy
    render json: {}
  end 
  

  def create
 
    @channel = Channel.new(channel_params)
    @channel.server_id = params[:server_id]
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
  
  def channel_params 
    params.require(:channel).permit(:channel_topic, :channel_name)
  end 
end 
