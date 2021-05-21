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
      # allow(subject).to receive(:user_id)
      post :create, params: { post: { message: "Hello, world!" } }
      expect(response).to redirect_to(root_url)
    end

    it "creates a post" do
      post :create, params: { post: { message: "Hello, world!" } }
      expect(Post.find_by(message: "Hello, world!")).to be
    end
  end

  describe "GET /" do
    it "responds with 200" do
      get :index
      expect(response).to have_http_status(200)
    end
  end
end
