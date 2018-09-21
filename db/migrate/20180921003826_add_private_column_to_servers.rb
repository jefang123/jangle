class AddPrivateColumnToServers < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :private, :boolean
  end
end
