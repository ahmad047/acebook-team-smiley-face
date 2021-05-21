require 'rails_helper'

RSpec.describe "users/show", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email@email.com",
      password: "123456",
      id: "1"
    ))

    post = Post.create(message: "message", user_id: "1")
    @posts = []
    @posts.push(post)

    Rails.application.routes.draw do

      @user = User.find_by(id: '1')

      get "/user/#{@user.id}/edit", to: 'users#edit'
    
    end

  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/First Name/)
    expect(rendered).to match(/Last Name/)
    expect(rendered).to match(/Email@email.com/)
    expect(rendered).to match(/message/)
    expect(rendered).to match(//)
  end
end
