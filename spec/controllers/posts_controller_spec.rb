require 'rails_helper'

RSpec.describe PostsController, type: :controller do

  let(:user) { User.new }
  before { allow(controller).to receive(:current_user) { user } }

  describe "GET /new " do
    it "responds with 200" do
      get :new
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /" do
    it "responds with 200" do
      post :create, params: { post: { message: "Hello, world!" } }
      expect(response).to redirect_to(root_url)
    end

    it "creates a post" do
      # post :create, params: { post: { message: "Hello, world!", id: "1" } }
      Post.create(message: "Hello, world!")
      Post.save
      expect(Post.find("1")).to eq "Hello, world!"
    end
  end

  describe "GET /" do
    it "responds with 200" do
      get :index
      expect(response).to have_http_status(200)
    end
  end
end
