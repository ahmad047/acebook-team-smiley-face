class PostsController < ApplicationController

  $LIKES = 0
  
  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    redirect_to posts_url
  end

  def index
    # can greet the logged in user
    # Can add this in in a before statement at the top - using a private method to do find function
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
    end
    @likes = $LIKES
    @post = Post.new
    @posts = Post.all.order('created_at DESC')
  end

  def likes
    @post = Post.find_by(id: params[:id])
    p @post
    # p Post.find_by(post[:post_id])
    # @post = Post.find_by()
    # if @post.update(user_params)
    $LIKES += 1
    # p params[:post_id]
    redirect_to posts_url
  end

  # def update
  #   respond_to do |format|
  #     if @user.update(user_params)
  #       format.html { redirect_to @user, notice: "User was successfully updated." }
  #       format.json { render :show, status: :ok, location: @user }
  #     else
  #       format.html { render :edit, status: :unprocessable_entity }
  #       format.json { render json: @user.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  private

  def post_params
    params.require(:post).permit(:message, :likes)
  end

  
end
