require 'rails_helper'

RSpec.describe "room_messages/index", type: :view do
  before(:each) do
    assign(:room_messages, [
      RoomMessage.create!(
        content: "MyText",
        user: nil,
        room: nil
      ),
      RoomMessage.create!(
        content: "MyText",
        user: nil,
        room: nil
      )
    ])
  end

  it "renders a list of room_messages" do
    render
    assert_select "tr>td", text: "MyText".to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
