class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.string :password_digest, null: false, default: ""
      t.string :remember_digest

      t.string :deleter_type
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :students, [:email, :deleted_at], unique: true
    add_index :students, :email, name: "idx_studnets_1"
  end
end
