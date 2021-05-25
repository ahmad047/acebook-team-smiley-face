Rails.application.routes.draw do
  resources :chatrooms
  resources :rooms
  root "posts#index"

  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'
  delete '/logout',to: 'sessions#destroy'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/logout',to: 'sessions#destroy'
 
  resources :users
  resources :sessions
  resources :messages

  resources :posts do
    resources :likes
    resources :comments
  end
end
