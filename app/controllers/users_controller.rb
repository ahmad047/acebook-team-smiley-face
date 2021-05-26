class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update ]
  # GET /users or /users.json
  def index
    @users = User.all
  end

  def friend_requests
    @user = User.find_by(params[:id])
    @requests = @user.requested_friends
  end

  # GET /users/1 or /users/1.json
  def show
    @friends = @user.friends
    @user = User.find(params[:id])
    @posts = @user.posts.all.order('created_at DESC')
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      redirect_to root_url, notice: "Signed up successfully"
    else
      render :new
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user = User.find_by(params[:id])
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully annihilated." }
      format.json { head :no_content }
    end
  end

  def add_friend
    @user = User.find_by(params[:id])
    current_user.friend_request(@user)
    redirect_to root_url, notice: "Friend request successfully sent."
  end

  def accept_friend
    @user = current_user
    friend = User.find_by(params[:id])
    
    @user.accept_request(friend)
    p "hello"
    p "HEEEEEERRE"
    p friend.first_name
    p @user.friends
    redirect_to root_url, notice: "Friend request accepted."
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      #params.require(user_id)
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :avatar)
    end

end
