class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: true
  has_one_attached :avatar
end
