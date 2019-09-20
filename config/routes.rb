Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup' }
  namespace :user do
    root to: 'static#index'
  end
  
  namespace :v1, defaults: { format: 'json' } do # routing for api v1
    resources :frameworks, only: [:index, :create]
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?  # non-ajax and html Mime type -> forward to StaticController 
  end
  
  root to: 'static#index' # forward root to StaticController

end
