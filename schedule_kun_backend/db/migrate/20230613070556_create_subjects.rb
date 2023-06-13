class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name, null: false, default: ""
      t.string :description, null: false, default: ""

      t.timestamps
    end
  end
end
