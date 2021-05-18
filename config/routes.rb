Rails.application.routes.draw do
  get 'sessions/new'
  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'

  resources :users
  root 'posts#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :posts
end
