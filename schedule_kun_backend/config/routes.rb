Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root "sessions#new"
  post "/" => "sessions#create"

  namespace :schedule_kun do
    namespace :students do
      get "/" => "sessions#new"
      post "login" => "sessions#login"
      delete "logout" => "sessions#logout"
      get "auth" => "sessions#auth"
    end

    namespace :guardians do
      get "/" => "sessions#new"
      post "login" => "sessions#login"
      delete "logout" => "sessions#logout"
      get "auth" => "sessions#auth"
    end

    breath :teachers do
      get "auth" => "sessions#auth"

      namespace :calendars do
        get "month"
        get "week"
      end

      resources :lessons, only: [:index, :new, :edit, :create, :update, :destroy]
    end
  end
end
