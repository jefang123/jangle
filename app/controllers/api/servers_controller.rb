class Api::ServersController < ApplicationController

  def index 
    @servers = current_user.servers
  end 

  def show 
    @server = Server.find_by(id: params[:id])
    @users = @server.users
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
    server = Server.find_by(id: params[:id])
    server.destroy
    render json: {}
  end 

  def create
    @server = Server.new(server_params)
    if @server.save
      UserJoin.create(server_id: @server.id, user_id: @server.creator_id)
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end
  
  def server_params 
    params.require(:server).permit(:creator_id, :server_name)
  end 
end 