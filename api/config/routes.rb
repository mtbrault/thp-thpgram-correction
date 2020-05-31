Rails.application.routes.draw do
  resources :comments
  resources :images
  devise_for :users
  # devise_for :users, controllers: {
  #   sessions: 'users/sessions',
  #   registration: 'users/registrations'
  # }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :profile do
    get '', action: :show
    post '', action: :update
  end
  root to: "home#index"
end
