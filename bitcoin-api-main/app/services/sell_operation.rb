class SellOperation

  def initialize(type_operation, user_id, current_sent, current_received, quantity_sent, quantity_received)
    @type_operation = type_operation
    @user_id = user_id
    @current_sent = current_sent
    @current_received = current_received
    @quantity_sent = quantity_sent
    @quantity_received = quantity_received
  end

  def call
    begin
      user = User.find_by(id: @user_id)
      bitcoin = user.btc
      usdolar = user.usd

      if @current_received == "btc"
        if usdolar > @quantity_sent
          operation = Operation.create(type_operation: @type_operation, user_id: @user_id, current_sent: @current_sent, current_received: @current_received, quantity_sent: @quantity_sent, quantity_received: @quantity_received)
          user.update(btc: bitcoin + @quantity_received , usd: usdolar - @quantity_sent)
          return {message: "Successful purchase!"}
        else
          return {message: "Not enough money. Try another value"}
        end
      end

      if @current_received == "usd"
        if bitcoin > @quantity_sent
          operation = Operation.create(type_operation: @type_operation, user_id: @user_id, current_sent: @current_sent, current_received: @current_received, quantity_sent: @quantity_sent, quantity_received: @quantity_received)
          user.update(btc: bitcoin - @quantity_sent , usd: usdolar + @quantity_received)
          return {message: "Successful purchase!"}
        else
          return {message: "Not enough money. Try another value"}
        end
      end
    rescue => exception
      puts exception
      render json: {message: "Sell error"}
    end
  end
end