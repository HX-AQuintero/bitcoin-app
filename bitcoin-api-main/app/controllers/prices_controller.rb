class PricesController < ApplicationController

  def prices
    begin
      info = PriceApi.new.price
      data = {data: info}
      render json: data
    rescue => exception
      puts exception
      render json: {message: "API error"}
    end
  end
end