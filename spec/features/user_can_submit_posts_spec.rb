require 'rails_helper'

feature "Timeline" do
  scenario "Can submit posts, view them and see how long ago they were posted" do
    visit '/users/new'
    fill_in 'user[first_name]', with: 'Richard'
    fill_in 'user[last_name]', with: 'McMahon'
    fill_in 'user[email]', with: 'rich@gmail.com'
    fill_in 'user[password]', with: '1234'
    fill_in 'user[password_confirmation]', with: '1234'
    click_button 'Create User'
    fill_in 'post[message]', with: 'Hello, world!'
    click_button 'Submit'
    expect(page).to have_content('Hello, world!')
    expect(page).to have_content('Posted less than a minute ago')
  end
end
