class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_one_attached :picture
  has_many :likes, dependent: :destroy
end
