class SessionsController < ApplicationController

  # sessions/new
  def new
  end

  # create session based on login
  def create
    redirect_to root_url
  end

  # DESTROY >:(
  def destroy
  end
end
