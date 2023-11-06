class UserLogin

  def initialize(username, password)
    @username = username
    @password = password
  end

  def call
    begin
      user = User.find_by(username: @username)
      if user == nil
        return "user doesn't exist"
      else 
        if user.password == @password
          return user.id
        else
          return "password is wrong. Try again"
        end
      end
    rescue => exception
      puts exception
      render json: {message: "Login error"}
    end
  end
end