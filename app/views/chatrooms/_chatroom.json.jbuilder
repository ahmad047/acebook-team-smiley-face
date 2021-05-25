json.extract! chatroom, :id, :content, :user_id, :room_id, :created_at, :updated_at
json.url chatroom_url(chatroom, format: :json)
