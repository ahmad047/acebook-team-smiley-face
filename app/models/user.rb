class User < ApplicationRecord
  has_many :comments
  has_many :posts
  has_secure_password
  validates :email, uniqueness: true, format: { with: /.*@.*/ }
  has_one_attached :avatar
end
