class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.references :branch, foreign_key: true
      t.string :name, null: false, default: ""

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :groups, :branch_id, name: "idx_groups_1"
  end
end
