class CreateGuardians < ActiveRecord::Migration[7.0]
  def change
    create_table :guardians do |t|
      t.string :name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.string :password_digest, null: false, default: ""
      t.string :remember_digest

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :guardians, [:email, :deleted_at], unique: true
    add_index :guardians, :email, name: "idx_guardians_1"
  end
end
