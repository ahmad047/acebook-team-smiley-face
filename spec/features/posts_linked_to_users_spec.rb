require 'rails_helper'

feature 'Associating posts to users' do
  scenario 'posting a status' do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    fill_in "post[message]", with: "Hello World!"
    click_button "Submit"
    expect(page).to have_content "Posted by Bob Ross"
  end
end
