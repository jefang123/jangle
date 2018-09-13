class AddImageUrlToServer < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :image_url, :string
  end
end
