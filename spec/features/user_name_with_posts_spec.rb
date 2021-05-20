require 'rails_helper'

feature "User names appear with their posts" do
  scenario "User makes a post and sees their name with it" do
    visit '/users/new'
    fill_in 'user[first_name]', with: 'Richard'
    fill_in 'user[last_name]', with: 'McMahon'
    fill_in 'user[email]', with: 'rich@gmail.com'
    fill_in 'user[password]', with: '1234'
    fill_in 'user[password_confirmation]', with: '1234'
    click_button 'Create User'
    fill_in "post[message]", with: "Hello, world!"
    click_button "Submit"
    expect(page).to have_content("Posted by Richard")
  end
end