class SessionsController < ApplicationController
include SessionsHelper

  def new
  end

  # create session based on login
  def create
    @user = User.find_by(email: params[:email].downcase)

    if @user && @user.authenticate(params[:password])

      #session helper
      log_in(@user)
      redirect_to root_url, notice: "Logged in successfully"
    else
      flash[:alert] = "Invalid email/password combination"
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: "Logged out successfully"
  end
end
