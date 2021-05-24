require 'rails_helper'

feature 'Entering email must be valid email expression' do
  scenario 'a user cannot sign up without valid email' do
    visit '/users/new'
    fill_in 'user[first_name]', with: 'john'
    fill_in 'user[last_name]', with: 'doe'
    fill_in 'user[email]', with: 'test.com'
    fill_in 'user[password]', with: 'password123'
    fill_in 'user[password_confirmation]', with: 'password123'
    click_button 'Create User'
    expect(page).to have_content('1 error prohibited this user from being saved:')
    expect(page).to have_content('Email is invalid')
  end
end