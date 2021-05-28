class Room < ApplicationRecord
    has_many :room_messages
    has_many :users, through: :room_messages
end
