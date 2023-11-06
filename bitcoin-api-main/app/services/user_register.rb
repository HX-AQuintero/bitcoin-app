class UserRegister

  def initialize(username, password, btc, usd)
    @username = username
    @password = password
    @btc = btc
    @usd = usd
  end

  def call
    begin
      user_exist = User.find_by(username: @username)
      if user_exist == nil
        user = User.create(username: @username, password: @password, btc: @btc, usd: @usd)
        return "user created successfully"
      else 
        return "username already in use. Try again"
      end
    rescue => exception
      puts exception
      render json: {message: "Register error"}
    end
  end
end