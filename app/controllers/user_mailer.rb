class UserMailer < ActionMailer::Base
  default :from => "tisserand.yohann@gmail.com"

  def registration_confirmation(user)
    @user = user
    # mail(:to => "#{user.first_name} <#{user.email}>", :subject => "Registration Confirmation")
    mail(:to => @user.email, :subject => "Registration Confirmation")
  end
end
