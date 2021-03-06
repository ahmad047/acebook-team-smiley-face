class SessionsController < ApplicationController
include SessionsHelper

  def new
  end

  def show
    render 'new'
  end

  # create session based on login
  def create
    @user = User.find_by(email: params[:email].downcase)

    # authenticate comes from 'has_secure_password'
    if @user && @user.authenticate(params[:password])
      if @user.email_confirmed
      #session helper
        log_in(@user)
        redirect_to root_url, notice: "Logged in successfully"
      else
        flash[:alert] = "Please activate your account."
        render 'new'
      end
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
