class CreateStudentGuardians < ActiveRecord::Migration[7.0]
  def change
    create_table :student_guardians do |t|
      t.references :student, null: false, foreign_key: true
      t.references :guardian, null: false, foreign_key: true

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :student_guardians, :student_id, name: "idx_student_guardians_1"
    add_index :student_guardians, :guardian_id, name: "idx_student_guardians_2"
  end
end
