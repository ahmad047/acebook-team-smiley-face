require 'rails_helper'

feature "Login" do
  scenario "Can login with existing credentials" do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    expect(page.status_code).to be(200)
    expect(page).to have_current_path("/")
    expect(page).not_to have_content("Login")
  end
end

# --> plant a user into the database
# --> log in with that exisitng credential
# --> tada! status 200
