json.extract! room_message, :id, :content, :user_id, :room_id, :created_at, :updated_at
json.url room_message_url(room_message, format: :json)
