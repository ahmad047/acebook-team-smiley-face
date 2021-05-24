class PostsController < ApplicationController

  def create
    if params[:message].nil?
      redirect_to root_url, notice: "post must not be empty"
    else
      @post = Post.create(post_params.merge(user_id: current_user.id))
      redirect_to root_url
    end
  end

  def index
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
    end

    @post = Post.new
    @posts = Post.all.order('created_at DESC')
  end

  def destroy
    @post = Post.find(params[:id])

    @post.destroy
    redirect_to root_url, notice: "Post deleted :("
  end

  private

  def post_params
    params.require(:post).permit(:message, :picture)
  end
end
