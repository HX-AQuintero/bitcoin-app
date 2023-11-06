class UsersController < ApplicationController

  def login
    begin
      user = UserLogin.new(params[:username], params[:password])
      login = user.call
      data = {login: login}
      render json: data
    rescue => exception
      puts exception
      render json: {message: "Login error"}
    end
  end

  def register
    begin
      user = UserRegister.new(params[:username], params[:password], params[:btc], params[:usd])
      new_user = user.call
      data = {register: new_user}
      render json: data
    rescue => exception
      puts exception
      render json: {message: "Register error"}
    end
  end

  def show
    begin
      user = User.find(params[:id])
      data = {btc: user.btc, usd: user.usd}
      render json: data
    rescue => exception
      puts exception
      render json: {message: "Show error"}
    end
  end
end