class PostsController < ApplicationController
  POSTS_PER_PAGE = 4  

  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params.merge(user_id: current_user.id))
    redirect_to root_url
  end

  def index
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
    end

    @post = Post.new
    @page = params.fetch(:page, 0).to_i
    @posts = Post.offset(@page * POSTS_PER_PAGE).limit(POSTS_PER_PAGE).order('created_at DESC')
    
  end

  def destroy
    @post = Post.find(params[:id])
  
    @post.destroy
    flash[:success] = "Post deleted :("
    redirect_to root_path
  end

  private

  def post_params
    params.require(:post).permit(:message)
  end
end
