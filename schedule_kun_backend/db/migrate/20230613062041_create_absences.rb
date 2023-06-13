class CreateAbsences < ActiveRecord::Migration[7.0]
  def change
    create_table :absences do |t|
      t.references :student, foreign_key: true
      t.references :lesson, foreign_key: true
      t.string :description, null: false, default: ""

      t.timestamps
    end
  end
end
