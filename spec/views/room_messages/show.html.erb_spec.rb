require 'rails_helper'

RSpec.describe "room_messages/show", type: :view do
  before(:each) do
    @room_message = assign(:room_message, RoomMessage.create!(
      content: "MyText",
      user: nil,
      room: nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(//)
    expect(rendered).to match(//)
  end
end
