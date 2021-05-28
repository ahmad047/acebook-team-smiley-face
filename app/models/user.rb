class User < ApplicationRecord
  before_create :confirmation_token
  has_many :comments
  has_many :posts
  has_secure_password
  validates :password, length: { minimum: 1 }, allow_blank: false
  # ^ prevents (blank password, non-blank confirmation) bug
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  has_one_attached :avatar
  has_many :likes, dependent: :destroy
  has_many :room_messages
  has_friendship

  def email_activate
    self.email_confirmed = true
    self.confirm_token = nil
    save!(:validate => false)
  end

  def confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

end
