class CreateStudentGuardians < ActiveRecord::Migration[7.0]
  def change
    create_table :student_guardians do |t|
      t.references :student, null: false, foreign_key: true
      t.references :guardian, null: false, foreign_key: true

      t.integer :delf, limit: 2, default: 0 # 0:通常, 1:削除
      t.integer :deleted_account_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.datetime :deleted_at
      t.integer :deleted_account_id

      t.timestamps
    end

    add_index :student_guardians, :student_id, name: "idx_student_guardians_1"
    add_index :student_guardians, :guardian_id, name: "idx_student_guardians_2"
  end
end
