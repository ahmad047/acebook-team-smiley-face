require 'rails_helper'

feature 'A user can sign out' do
  scenario 'signing out' do
    visit '/login'
    fill_in 'Email', with: 'jason@him.com'
    fill_in 'Password', with: '123456'
    click_button 'Login'
    click_button 'Log Out'
    expect(current_path).to eq(root_path)
  end
end