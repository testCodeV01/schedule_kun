class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :email, null: false, default: ""
      t.string :password, null: false, default: ""
      t.string :name, null: false, default: ""

      t.integer :delf, limit: 2, default: 0 # 0:通常, 1:削除
      t.integer :deleted_account_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.datetime :deleted_at
      t.integer :deleted_account_id

      t.timestamps
    end

    add_index :students, [:email, :deleted_at], unique: true
    add_index :students, :email, name: "idx_studnets_1"
  end
end
