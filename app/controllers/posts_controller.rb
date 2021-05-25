class PostsController < ApplicationController

  def create
    @post = Post.create(post_params.merge(user_id: current_user.id))
    redirect_to root_url
  end

  def edit
    @post = Post.find(params[:id])
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
    flash[:success] = "Post deleted :("
    redirect_to root_path
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    redirect_to user_path
  end

  private

  def post_params
    params.require(:post).permit(:message, :picture)
  end
end
