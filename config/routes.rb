Rails.application.routes.draw do
  root "posts#index"

  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'
  delete '/logout',to: 'sessions#destroy'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/logout',to: 'sessions#destroy'
 
  resources :users do
    get :add_friend
    get :friend_requests
    get :accept_friend
  end
  
  resources :sessions

  resources :posts do
    resources :likes
    resources :comments
  end
end
