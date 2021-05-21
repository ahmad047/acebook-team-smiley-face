class User < ApplicationRecord
  has_many :likes, dependent: :destroy
  has_secure_password
  validates :email, uniqueness: true
end
