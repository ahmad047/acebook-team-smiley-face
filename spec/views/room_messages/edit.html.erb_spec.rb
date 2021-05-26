require 'rails_helper'

RSpec.describe "room_messages/edit", type: :view do
  before(:each) do
    @room_message = assign(:room_message, RoomMessage.create!(
      content: "MyText",
      user: nil,
      room: nil
    ))
  end

  it "renders the edit room_message form" do
    render

    assert_select "form[action=?][method=?]", room_message_path(@room_message), "post" do

      assert_select "textarea[name=?]", "room_message[content]"

      assert_select "input[name=?]", "room_message[user_id]"

      assert_select "input[name=?]", "room_message[room_id]"
    end
  end
end
