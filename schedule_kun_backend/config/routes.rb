Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root "sessions#new"
  post "/" => "sessions#create"

  namespace :schedule_kun do
    namespace :student do
      get "/" => "sessions#new"
      post "login" => "sessions#login"
      delete "logout" => "sessions#logout"
      get "auth" => "sessions#auth"
    end

    namespace :guardian do
      get "/" => "sessions#new"
      post "login" => "sessions#login"
      delete "logout" => "sessions#logout"
      get "auth" => "sessions#auth"
    end

    namespace :teacher do
      get "/" => "sessions#new"
      post "login" => "sessions#login"
      delete "logout" => "sessions#logout"
      get "auth" => "sessions#auth"

      namespace :calendars do
        get "month"
        get "week"
      end
    end
  end
end
