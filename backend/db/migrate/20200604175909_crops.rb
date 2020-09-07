class Crops < ActiveRecord::Migration[6.0]
  def change
      create_table :crops do |t|
        t.string :name
        t.string :description
        t.string :sun_requirements
        t.string :sowing_method
        t.integer :height
        t.string :image_path
        t.integer :growing_days
        t.string :day_planted
        t.integer :number_planted

        t.integer :current_height
        t.integer :quantity_returned
        t.string :status_of_plant

        t.integer :garden_id
      end
  end
end
