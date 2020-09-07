class Comments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :content

      t.integer :post_id
    end
  end
end
