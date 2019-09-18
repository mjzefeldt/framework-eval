Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :v1, defaults: { format: 'json' } do # routing for api v1
    get 'frameworks', to: 'frameworks#index'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?  # non-ajax and html Mime type -> forward to StaticController 
  end
  
  root 'static#index' # forward root to StaticController

end
