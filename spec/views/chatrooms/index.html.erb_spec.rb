require 'rails_helper'

RSpec.describe "chatrooms/index", type: :view do
  before(:each) do
    assign(:chatrooms, [
      Chatroom.create!(
        content: "MyText",
        user: nil,
        room: nil
      ),
      Chatroom.create!(
        content: "MyText",
        user: nil,
        room: nil
      )
    ])
  end

  it "renders a list of chatrooms" do
    render
    assert_select "tr>td", text: "MyText".to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
