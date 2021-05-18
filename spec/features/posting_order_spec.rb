require 'rails_helper'

RSpec.feature "Timeline", type: :feature do 
  scenario "Posts are posted in reverse chronological order" do
  visit "/posts"
  click_link "New post"
  fill_in "Message", with: "Hi, world!"
  click_button "Submit"
  click_link "New post"
  fill_in "Message", with: "Hello, wurld!"
  click_button "Submit"  
  expect(page.find('p:nth-child(1)')).to have_content 'Hello, wurld!'
  expect(page.find('p:nth-child(2)')).to have_content 'Hi, world!'
  end
end