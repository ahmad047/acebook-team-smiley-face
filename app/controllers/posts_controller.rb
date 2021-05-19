class PostsController < ApplicationController
  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    redirect_to posts_url
  end

  def index
    @posts = Post.all
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
    end
  end

  private

  def post_params
    params.require(:post).permit(:message)
  end
end
