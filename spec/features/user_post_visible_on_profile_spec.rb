require 'rails_helper'

feature 'User profile' do
  scenario 'Can submit posts and see them on their own profile' do
    visit '/login'
    fill_in 'Email', with: 'bobross@mail.com'
    fill_in 'Password', with: 'password123'
    click_button 'Login'
    p body
    fill_in 'post[message]', with: 'Hello, world!'
    click_button 'Submit'
    visit '/users/1'
    expect(page).to have_content 'Hello, world!'
  end
end