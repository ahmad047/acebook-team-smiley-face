Rails.application.routes.draw do
  resources :room_messages
  resources :rooms
  root "posts#index"

  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'
  delete '/logout',to: 'sessions#destroy'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/logout',to: 'sessions#destroy'
 
  resources :users do
    post :add_friend
    get :friend_requests
    post :accept_request
    post :decline_request
    member do
      get :confirm_email
    end
  end
  
  resources :sessions

  resources :posts do
    resources :likes
    resources :comments
  end
end
