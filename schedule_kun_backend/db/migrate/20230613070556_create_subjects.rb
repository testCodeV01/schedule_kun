class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name, null: false, default: ""
      t.string :description, null: false, default: ""

      t.string :deleter_type
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
