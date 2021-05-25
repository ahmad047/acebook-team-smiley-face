require 'rails_helper'

feature "Notice messages" do

  scenario 'signup prompts a notice' do
    visit '/users/new'
    fill_in 'user[first_name]', with: 'john'
    fill_in 'user[last_name]', with: 'doe'
    fill_in 'user[email]', with: 'test@test.com'
    fill_in 'user[password]', with: 'password123'
    fill_in 'user[password_confirmation]', with: 'password123'
    click_button 'Create User'
    expect(current_path).to eq(root_path)
    expect(page).to have_content('Signed up successfully')
  end

  scenario "login prompts a notice" do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    expect(page.status_code).to be(200)
    expect(page).to have_current_path("/")
    expect(page).not_to have_content("Login")
    expect(page).to have_content('Logged in successfully')
  end

  scenario "invalid login prompts a notice" do
    visit "/login"
    fill_in "Email", with: "invalidemail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    expect(page).to have_content('Invalid email/password combination')
  end

  scenario "logging out prompts a notice" do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    click_link "Log Out"
    expect(current_path).to eq(root_path)
    expect(page).to have_content('Logged out successfully')
  end

  scenario "user updating profile prompts a notice" do
    visit '/users/new'
    fill_in 'user[first_name]', with: 'john'
    fill_in 'user[last_name]', with: 'doe'
    fill_in 'user[email]', with: 'test@test.com'
    fill_in 'user[password]', with: 'password123'
    fill_in 'user[password_confirmation]', with: 'password123'
    click_button 'Create User'
    expect(current_path).to eq(root_path)
    click_link "View my profile"
    click_link "Edit"
    fill_in 'user[password]', with: "aaa"
    fill_in 'user[password_confirmation]', with: "aaa"
    click_button "Update User"
    expect(page).to have_content('User was successfully updated.')
  end

  scenario "deleting post prompts a notice" do
    visit "/login"
    fill_in "Email", with: "bobross@mail.com"
    fill_in "Password", with: "password123"
    click_button "Login"
    fill_in 'post[message]', with: 'Hello, world!'
    click_button 'Submit'
    expect(page).to have_content('Hello, world!')
    expect(page).to have_content('Posted less than a minute ago')
    click_button "delete post"
    expect(page).to have_content('Post deleted :(')
  end


end
