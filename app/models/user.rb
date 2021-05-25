class User < ApplicationRecord
  validates_uniqueness_of :username
  has_many :comments
  has_many :posts
  has_secure_password
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  has_one_attached :avatar
  has_many :likes, dependent: :destroy
  has_many :messagee, foreign_key: :receiver_id, class_name: 'Message'  
  has_many :senders, through: :messagee
  has_many :messaged, foreign_key: :sender_id, class_name: 'Message'
  has_many :receivers, through: :messaged
end
