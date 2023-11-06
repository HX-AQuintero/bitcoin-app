require 'json'
require 'net/http'

class PriceApi
  def price
    begin
      url = URI('https://api.coindesk.com/v1/bpi/currentprice.json')
      puts url
      res = Net::HTTP.get(url)
      info = JSON.parse(res)
      return info['bpi']['USD']['rate_float']
    rescue => exception
      puts exception
      render json: {message: "Price error"}
    end
  end
end