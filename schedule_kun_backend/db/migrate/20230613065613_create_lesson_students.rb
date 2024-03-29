class CreateLessonStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :lesson_students do |t|
      t.references :lesson, foreign_key: true
      t.references :student, foreign_key: true

      t.string :deleter_type
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :lesson_students, :lesson_id, name: "idx_lesson_students_1"
    add_index :lesson_students, :student_id, name: "idx_lesson_students_2"
  end
end
