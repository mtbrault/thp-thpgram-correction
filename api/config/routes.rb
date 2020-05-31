Rails.application.routes.draw do
  devise_for :users
  # devise_for :users, controllers: {
  #   sessions: 'users/sessions',
  #   registration: 'users/registrations'
  # }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # resource: profile
  resource :profile, only: [:show, :edit, :update]
  root to: "home#index"
end
