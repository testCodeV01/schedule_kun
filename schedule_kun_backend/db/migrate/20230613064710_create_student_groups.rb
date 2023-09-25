class CreateStudentGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :student_groups do |t|
      t.references :student, foreign_key: true
      t.references :group, foreign_key: true

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :student_groups, :student_id, name: "idx_student_groups_1"
    add_index :student_groups, :group_id, name: "idx_student_groups_2"
  end
end
