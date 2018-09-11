class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
  end

  def destroy
    logout!
  end
end
