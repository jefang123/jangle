class Api::UserjoinsController < ApplicationController
  def create
    @user = current_user
    @server = Server.find_by(id: params[:join][:server_id])
    UserJoin.create(user_id:@user.id, server_id:@server.id)
    render json: {}
  end 

  def destroy
    @user = current_user
    @server = Server.find_by(id: params[:server_id])
    join = UserJoin.find_by(user_id: @user.id, server_id: @server.id)
    join.destroy
    render json: {}
  end 

end