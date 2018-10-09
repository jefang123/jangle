class Api::UsersController < ApplicationController
  def create
    User.includes(:servers)
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      @server = Server.create(creator_id: @user.id, server_name: "Home", private:true)
      UserJoin.create(user_id: @user.id, server_id: @server.id)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(params[:id])
  end

  def index 
    @users = User.all 
  end 
  
  def user_params
    params.require(:user).permit(:username, :email, :password, :image_url)
  end
end
