class RoomMessagesController < ApplicationController
  before_action :set_room_message, only: %i[ show edit update destroy ]

  # GET /room_messages or /room_messages.json
  def index
    @room_messages = RoomMessage.all
  end

  # GET /room_messages/1 or /room_messages/1.json
  def show
    @room_messages = RoomMessage.all
  end

  # GET /room_messages/new
  def new
    @room_message = RoomMessage.new
  end

  # GET /room_messages/1/edit
  def edit
  end

  # POST /room_messages or /room_messages.json
  def create
    @room_message = RoomMessage.new(room_message_params)
    @room_message.user = current_user
    @room_message.save
    
    redirect_to request.referrer
  end

  # PATCH/PUT /room_messages/1 or /room_messages/1.json
  def update
    respond_to do |format|
      if @room_message.update(room_message_params)
        format.html { redirect_to @room_message, notice: "Room message was successfully updated." }
        format.json { render :show, status: :ok, location: @room_message }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @room_message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /room_messages/1 or /room_messages/1.json
  def destroy
    @room_message.destroy
    respond_to do |format|
      format.html { redirect_to room_messages_url, notice: "Room message was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_room_message
      @room_message = RoomMessage.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def room_message_params
      params.require(:room_message).permit(:content, :user_id, :room_id)
    end
end
