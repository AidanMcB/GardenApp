Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  default_url_options :host => 'localhost:3000'

  resources :users
  resources :crops
  resources :gardens
  resources :posts 
  resources :comments
  
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  post('/login', to: 'authentication#login')
  get('/login', to: 'authentication#login')

  post('/create', to: 'posts#create')
  get('/create', to: 'posts#create')
  
  post('/logout', to: 'authentication#logout')

  get('/get_user', to: 'users#get_user')
  post('/get_user', to: 'users#get_user')

  get('/signUp', to: 'authentication#signUp')
  post('/signUp', to: 'authentication#signUp')

  
  
end
