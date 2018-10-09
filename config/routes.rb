Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:create, :destroy]
    resources :userjoins, only: [:create, :destroy]
    resources :servers do 
      resources :channels, only: [:create]
    end 
    resources :channels do 
      resources :messages, only: [:create]
    end 
    resources :messages
    mount ActionCable.server => '/cable'
  end

end
