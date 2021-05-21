Rails.application.routes.draw do
  root "posts#index"

  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'
  delete '/logout',to: 'sessions#destroy'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/logout',to: 'sessions#destroy'

  resources :users

  resources :posts do
    resources :likes
  end


end
