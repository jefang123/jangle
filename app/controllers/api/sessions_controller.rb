class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ['Invalid Credentials, Please try again'], status: 401
      
    end
  end

  def destroy
    unless current_user
      render json: ['Not logged in'], status: 401
    end

    logout!
    render json: {}
  end
end
