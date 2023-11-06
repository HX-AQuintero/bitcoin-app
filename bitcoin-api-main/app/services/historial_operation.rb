class HistorialOperation

  def initialize(user_id)
    @user_id = user_id
  end

  def call
    begin
      operations = Operation.where(user_id: @user_id)
      if operations.length == 0
        return {message: []}
      else
        return {message: operations}
      end
    rescue => exception
      puts exception
      render json: {message: "Historial error"}
    end
  end
end