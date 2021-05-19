Rails.application.routes.draw do

  root "posts#index"

  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'
  delete '/logout',to: 'sessions#destroy'



  resources :users

  delete '/users', to: 'users#destroy'


  resources :posts
end
