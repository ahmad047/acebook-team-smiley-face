class PostsController < ApplicationController

  def create
    if params[:post][:message].length == 0 && params[:post][:picture].nil?
      redirect_to root_url, notice: "post must not be empty"
    elsif !params[:post][:picture].nil?
      @post = Post.create(post_params.merge(user_id: current_user.id))
      redirect_to root_url
    else
      @post = Post.create(post_params.merge(user_id: current_user.id))
      redirect_to root_url
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def landing
    render 'lander'
  end

  def index
    if !@user
      redirect_to landing_path
    elsif session[:user_id]
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
