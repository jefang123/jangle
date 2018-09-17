class Api::UserJoinsController < ApplicationController
  def create
    @user = current_user
    @server = Server.find_by(params[:id])
    UserJoin.create(user_id:@user.id, server_id:@server.id)
  end 

  def delete 
    @user = current_user
    @server = Server.find_by(params[:id])
    join = UserJoin.find_by(user_id: @user.id, server_id: @server.id)
    join.destroy
    render json: {}
  end 
end