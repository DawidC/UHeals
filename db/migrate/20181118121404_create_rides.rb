class CreateRides < ActiveRecord::Migration[5.2]
  def change
    create_table :rides do |t|
      t.string :from
      t.string :to
      t.datetime :date
      t.integer :current_seats
      t.integer :max_seats
      t.string :client_ids

      t.timestamps
    end
  end
end
