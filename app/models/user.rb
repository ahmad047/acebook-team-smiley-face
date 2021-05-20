class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_secure_password
  validates :email, uniqueness: true
end
