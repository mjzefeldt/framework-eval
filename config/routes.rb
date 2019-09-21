Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_up: 'signup' }
  
  namespace :v1, defaults: { format: 'json' } do # routing for api v1
    resources :frameworks, only: [:index, :create]
    match '/frameworks/check_vote', to: 'frameworks#check_vote', via: :get
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?  # non-ajax and html Mime type -> forward to StaticController 
  end
  
  root to: 'static#index' # forward root to StaticController

end
