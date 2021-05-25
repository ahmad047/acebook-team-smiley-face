require 'rails_helper'

RSpec.describe "chatrooms/new", type: :view do
  before(:each) do
    assign(:chatroom, Chatroom.new(
      content: "MyText",
      user: nil,
      room: nil
    ))
  end

  it "renders new chatroom form" do
    render

    assert_select "form[action=?][method=?]", chatrooms_path, "post" do

      assert_select "textarea[name=?]", "chatroom[content]"

      assert_select "input[name=?]", "chatroom[user_id]"

      assert_select "input[name=?]", "chatroom[room_id]"
    end
  end
end
