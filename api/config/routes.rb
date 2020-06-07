Rails.application.routes.draw do
  resources :comments
  resources :images do
    resources :comments, only: [:index], controller: 'images/comments'
  end

  devise_for :users

  namespace :profile do
    get '', action: :show
    post '', action: :update
    resources :comments, only: [:index]
    resources :images, only: [:index]
  end
  root to: "images#index"
end
