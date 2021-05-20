require 'rails_helper'

RSpec.feature "Likes", type: :feature do
  scenario "A user is able to like a post" do
    visit '/users/new'
    fill_in 'user[first_name]', with: 'john'
    fill_in 'user[last_name]', with: 'doe'
    fill_in 'user[email]', with: 'test@test.com'
    fill_in 'user[password]', with: 'password123'
    fill_in 'user[password_confirmation]', with: 'password123'
    click_button 'Create User'
    visit "/posts"
    fill_in 'post[message]', with: "Hi, world!"
    click_button "Submit"  
    expect(page).to have_content 'Likes:'
    expect(page).to have_selector(:link_or_button, 'Like')
    click_button 'Like'
    expect(page).to have_content 'Likes: 1'
    click_button 'Like'
    expect(page).to have_content 'Likes: 2'
  end
end