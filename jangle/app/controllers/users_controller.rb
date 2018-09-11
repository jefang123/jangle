class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
    else 
    end
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :image_url)
  end
end
