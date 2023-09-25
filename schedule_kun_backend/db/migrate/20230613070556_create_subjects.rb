class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name, null: false, default: ""
      t.string :description, null: false, default: ""

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end
  end
end
