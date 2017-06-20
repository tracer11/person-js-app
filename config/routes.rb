Rails.application.routes.draw do
  get '/people' => 'people#index'

  namespace :api do
    namespace :v1 do
      get '/people' => 'people#index'
      post '/people' => 'people#create'
     end 
  end
end
