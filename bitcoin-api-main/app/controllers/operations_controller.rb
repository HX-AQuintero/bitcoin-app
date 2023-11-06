class OperationsController < ApplicationController

  def buy
    begin
      operation = BuyOperation.new(params[:type_operation], params[:user_id], params[:current_sent], params[:current_received], params[:quantity_sent], params[:quantity_received])
      data = operation.call
      render json: data
    rescue => exception
      puts exception
      render json: {message: "Buy error"}
    end
  end

  def sell
    begin
      operation = SellOperation.new(params[:type_operation], params[:user_id], params[:current_sent], params[:current_received], params[:quantity_sent], params[:quantity_received])
      data = operation.call
      render json: data
    rescue => exception
      puts exception
      render json: {message: "Sell error"}
    end
  end

  def details
    begin
      operation = Operation.find(params[:id])
      render json: operation
    rescue => exception
      puts exception
      render json: {message: "Detail error"}
    end
  end

  def historial
    begin
      operations = HistorialOperation.new(params[:user_id])
      data = operations.call
      render json: data
    rescue => exception
      puts exception
      render json: {message: "Historial error"}
    end
  end
end