class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :channel_name, null: false
      t.string :channel_topic
      t.integer :server_id, null: false

      t.timestamps
    end
  end
end
