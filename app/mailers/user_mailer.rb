class UserMailer < ApplicationMailer
  def registration_confirmation(user)
    @user = user
    mail(to: @user.email, content_type: "text/html", subject: 'Welcome to My Awesome Site')
 end
end
