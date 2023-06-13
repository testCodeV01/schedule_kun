class CreateSchools < ActiveRecord::Migration[7.0]
  def change
    create_table :schools do |t|
      t.string :name, null: false, default: ""
      t.string :zip_code, null: false, default: ""
      t.string :address, null: false, default: ""
      t.string :phone_number, null: false, default: ""
      t.string :description, null: false, default: ""

      t.timestamps
    end
  end
end
