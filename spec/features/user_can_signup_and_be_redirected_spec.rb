require 'rails_helper'

RSpec.feature "Timeline", type: :feature do
  scenario 'a user can sing up and be redirected' do
    visit '/users/new'
    fill_in 'user[first_name]', with: 'john'
    fill_in 'user[last_name]', with: 'doe'
    fill_in 'user[email]', with: 'test@test.com'
    fill_in 'user[password]', with: 'password123'
    fill_in 'user[password_confirmation]', with: 'password123'
    click_button 'Create User'
    expect(current_path).to eq(root_path)
  end
end
