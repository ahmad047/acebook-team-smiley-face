require 'rails_helper'

feature "User names appear with their posts" do
  scenario "User makes a post and sees their name with it" do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    fill_in 'post[message]', with: 'Hello, world!'
    click_button 'Post'
    expect(page).to have_content('Posted by Bob')
  end
end