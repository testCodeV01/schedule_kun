class CreateLessonStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :lesson_students do |t|
      t.references :lesson, foreign_key: true
      t.references :student, foreign_key: true

      t.integer :delf, limit: 2, default: 0 # 0:通常, 1:削除
      t.integer :deleted_account_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.datetime :deleted_at
      t.integer :deleted_account_id

      t.timestamps
    end

    add_index :lesson_students, :lesson_id, name: "idx_lesson_students_1"
    add_index :lesson_students, :student_id, name: "idx_lesson_students_2"
  end
end
