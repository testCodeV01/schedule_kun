class CreateBranches < ActiveRecord::Migration[7.0]
  def change
    create_table :branches do |t|
      t.references :school, null: false, foreign_key: true
      t.string :name, null: false, default: ""
      t.string :zip_code, null: false, default: ""
      t.string :address, null: false, default: ""
      t.string :phone_number, null: false, default: ""

      t.timestamps
    end
  end
end
