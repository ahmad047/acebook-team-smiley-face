class SessionsController < ApplicationController
include SessionsHelper

  # sessions/new
  def new
  end

  # create session based on login
  def create
    user = User.find_by(email: params[:email].downcase)

    if user && user.authenticate(params[:password])

      #session helper
      log_in(user)
      redirect_to root_url, notice: "Logged in successfully"
    else
      flash[:alert] = "Invalid email/password combination"
      render 'new'
    end
  end

  # DESTROY >:(
  def destroy
  end
end
