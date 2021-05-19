require 'rails_helper'

RSpec.describe "users/index", type: :view do
  before(:each) do
    assign(:users, [
      User.create!(
        first_name: "First Name",
        last_name: "Last Name",
        email: "kerri@gmail.com",
        password: "123456"
      ),
      User.create!(
        first_name: "First Name",
        last_name: "Last Name",
        email: "phil@gmail.com",
        password: "123456"
      )
    ])
  end

  it "renders a list of users" do
    render
    assert_select "tr>td", text: "First Name".to_s, count: 2
    assert_select "tr>td", text: "Last Name".to_s, count: 2
    assert_select "tr>td", text: "kerri@gmail.com".to_s, count: 1
    assert_select "tr>td", text: "phil@gmail.com".to_s, count: 1
    # assert_select "tr>td", text: "".to_s, count: 2 // removed as it was wanting the password to appear on the page
  end
end
