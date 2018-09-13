class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.integer :creator_id, null:false
      t.string :server_name, null:false

      t.timestamps
    end
  end
end
