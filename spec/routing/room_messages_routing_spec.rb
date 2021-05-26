require "rails_helper"

RSpec.describe RoomMessagesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/room_messages").to route_to("room_messages#index")
    end

    it "routes to #new" do
      expect(get: "/room_messages/new").to route_to("room_messages#new")
    end

    it "routes to #show" do
      expect(get: "/room_messages/1").to route_to("room_messages#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/room_messages/1/edit").to route_to("room_messages#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/room_messages").to route_to("room_messages#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/room_messages/1").to route_to("room_messages#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/room_messages/1").to route_to("room_messages#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/room_messages/1").to route_to("room_messages#destroy", id: "1")
    end
  end
end
