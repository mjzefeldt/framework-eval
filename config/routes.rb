Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :user do
    root to: 'static#index'
  end
  
  namespace :v1, defaults: { format: 'json' } do # routing for api v1
    # get 'frameworks', to: 'frameworks#index'
    resources :frameworks, only: [:index, :create]
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?  # non-ajax and html Mime type -> forward to StaticController 
  end
  
  #root 'static#index' # forward root to StaticController - might be root to: 'static#index'
  root to: 'static#index'

end
