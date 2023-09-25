class CreateAbsences < ActiveRecord::Migration[7.0]
  def change
    create_table :absences do |t|
      t.references :student, foreign_key: true
      t.references :lesson, foreign_key: true
      t.string :description, null: false, default: ""

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :absences, :student_id, name: "idx_absences_1"
    add_index :absences, :lesson_id, name: "idx_absences_2"
  end
end
