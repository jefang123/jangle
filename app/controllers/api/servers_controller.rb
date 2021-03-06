class Api::ServersController < ApplicationController

  def index 
    @servers = current_user.servers
  end 

  def show 
    @server = Server.find_by(id: params[:id])
  
    if @server 
      @users = @server.users 
      if @server.private
        @channels = Channel.where(channel_name: current_user.username).or(Channel.where(server_id: @server.id))
      else
        @channels = @server.channels 
      end 
    else 
      render json: ["No Such Server"], status: 422
    end 
  end 

  def update
    @server = Server.find_by(id: params[:id])  
    if @server.update(server_params)
      render :show 
    else
      render json: @server.errors.full_messages, status: 422
    end
  end 

  def destroy 
    @server = Server.find_by(id: params[:id])
    if @server.server_name == "Home"
      return render json: "Cannot Delete Home Server", status: 422
    end 
    @server.destroy
    render json: {}
  end 

  def create
    @server = Server.new(server_params)
    @server.creator_id = current_user.id
    if @server.save
      UserJoin.create(server_id: @server.id, user_id: @server.creator_id)
      Channel.create(server_id:@server.id, channel_name:"general", channel_topic:"Anything is welcome here")
      @users = @server.users
      @channels = @server.channels
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end
  
  def server_params 
    params.require(:server).permit(:creator_id, :server_name)
  end 
end 