require 'rails_helper'

# RSpec.feature "Timeline", type: :feature do
feature "Timeline" do
  scenario "Can submit posts and view them" do
    visit "/posts"
    click_button "New post"
    fill_in "Message", with: "Hello, world!"
    click_button "Submit"
    expect(page).to have_content("Hello, world!")
    expect(page).to have_content("Posted less than a minute ago")
  end
end
