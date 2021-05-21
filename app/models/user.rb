class User < ApplicationRecord
  has_many :comments
  has_many :posts
  has_secure_password
  validates :email, uniqueness: true
end
