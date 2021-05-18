module SessionsHelper

  def log_in(user)
    session[:user_id] = user.id
    puts session
    puts 'HERE :('
  end

end
