class CreateStudentGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :student_groups do |t|
      t.references :student, foreign_key: true
      t.references :group, foreign_key: true

      t.integer :delf, limit: 2, default: 0 # 0:通常, 1:削除
      t.integer :deleted_account_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.datetime :deleted_at
      t.integer :deleted_account_id

      t.timestamps
    end

    add_index :student_groups, :student_id, name: "idx_student_groups_1"
    add_index :student_groups, :group_id, name: "idx_student_groups_2"
  end
end
