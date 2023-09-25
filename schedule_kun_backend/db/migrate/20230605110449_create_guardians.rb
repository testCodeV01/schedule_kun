class CreateGuardians < ActiveRecord::Migration[7.0]
  def change
    create_table :guardians do |t|
      t.string :name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.string :password_digest, null: false, default: ""
      t.string :remember_digest

      t.string :deleter_type
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :guardians, [:email, :deleted_at], unique: true
    add_index :guardians, :email, name: "idx_guardians_1"
  end
end
