class Operation < ApplicationRecord
  validates :type_operation, presence: true
  validates :user_id, presence: true
  validates :current_sent, presence: true
  validates :current_received, presence: true
  validates :quantity_sent, presence: true
  validates :quantity_received, presence: true
end
