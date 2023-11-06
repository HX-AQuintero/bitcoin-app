Rails.application.routes.draw do

  get "/info", to: "prices#prices"
  post "/login", to: "users#login"
  post "/show", to: "users#show"
  post "/register", to: "users#register"
  post "/buy", to: "operations#buy"
  post "/sell", to: "operations#sell"
  post "/details", to: "operations#details"
  post "/historial", to: "operations#historial"

end
