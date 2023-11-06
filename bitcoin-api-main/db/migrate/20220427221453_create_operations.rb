class CreateOperations < ActiveRecord::Migration[7.0]
  def change
    create_table :operations do |t|
      t.string :type_operation
      t.string :user_id
      t.string :current_sent
      t.string :current_received
      t.float :quantity_sent
      t.float :quantity_received

      t.timestamps
    end
  end
end
