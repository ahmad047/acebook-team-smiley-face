require 'rails_helper'

RSpec.describe "room_messages/new", type: :view do
  before(:each) do
    assign(:room_message, RoomMessage.new(
      content: "MyText",
      user: nil,
      room: nil
    ))
  end

  it "renders new room_message form" do
    render

    assert_select "form[action=?][method=?]", room_messages_path, "post" do

      assert_select "textarea[name=?]", "room_message[content]"

      assert_select "input[name=?]", "room_message[user_id]"

      assert_select "input[name=?]", "room_message[room_id]"
    end
  end
end
