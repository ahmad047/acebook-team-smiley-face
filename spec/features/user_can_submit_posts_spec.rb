require 'rails_helper'

feature "Timeline" do
  scenario "Can submit posts, view them and see how long ago they were posted" do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    fill_in 'post[message]', with: 'Hello, world!'
    click_button 'Post'
    expect(page).to have_content('Hello, world!')
    expect(page).to have_content('Posted less than a minute ago')
  end
end
