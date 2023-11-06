class User < ApplicationRecord
  validates :username, presence: true
  validates :password, presence: true
  validates :btc, presence: true
  validates :usd, presence: true
end
