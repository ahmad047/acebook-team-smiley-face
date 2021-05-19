Rails.application.routes.draw do

  root "posts#index"

  get '/login', to: 'sessions#new'
  post '/login',to: 'sessions#create'
  delete '/logout',to: 'sessions#destroy'



  resources :users

  post 'users/:id', to: 'users#show'
  post 'users/:id/edit', to: 'users#edit'
  delete '/users', to: 'users#destroy'


  resources :posts
end
