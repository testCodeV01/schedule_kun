class AddSubjectIdToLesson < ActiveRecord::Migration[7.0]
  def change
    add_reference :lessons, :subject, foreign_key: true

    add_index :lessons, :subject_id, name: "idx_lessons_subject_id"
  end
end
