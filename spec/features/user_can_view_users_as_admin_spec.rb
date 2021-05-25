require 'rails_helper'

feature 'Admin priveledge' do
  scenario 'can access all users' do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    visit '/users'
    expect(page).to have_content "bobross@mail.com"
  end
end