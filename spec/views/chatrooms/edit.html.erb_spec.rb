require 'rails_helper'

RSpec.describe "chatrooms/edit", type: :view do
  before(:each) do
    @chatroom = assign(:chatroom, Chatroom.create!(
      content: "MyText",
      user: nil,
      room: nil
    ))
  end

  it "renders the edit chatroom form" do
    render

    assert_select "form[action=?][method=?]", chatroom_path(@chatroom), "post" do

      assert_select "textarea[name=?]", "chatroom[content]"

      assert_select "input[name=?]", "chatroom[user_id]"

      assert_select "input[name=?]", "chatroom[room_id]"
    end
  end
end
