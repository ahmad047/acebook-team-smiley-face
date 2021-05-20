Rails.application.routes.draw do

  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'
  delete '/logout',to: 'sessions#destroy'
  get '/logout',to: 'sessions#destroy'
  get '/users/:id', to: 'users#show'

  resources :users
  root 'posts#index'
  # login 'sessions#new'

  resources :posts
end
