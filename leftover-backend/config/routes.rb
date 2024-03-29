Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources 'provider', only: [:show, :create, :destroy, :update]
  
  resources 'item', only: [:show, :create, :index, :update]

  post '/item/unpublish', to: 'item#unpublish'

  post '/authenticate', to: 'authentication#create'

  get '/identity', to: 'authentication#identity'

end
