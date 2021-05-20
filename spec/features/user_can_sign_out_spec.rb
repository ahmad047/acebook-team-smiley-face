require 'rails_helper'

feature "A user can log out" do
  scenario "logging out" do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    click_link "Log Out"
    expect(current_path).to eq(root_path)
  end
end
