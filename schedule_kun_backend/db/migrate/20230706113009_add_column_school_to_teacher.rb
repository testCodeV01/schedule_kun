class AddColumnSchoolToTeacher < ActiveRecord::Migration[7.0]
  def change
    add_reference :teachers, :school, foreign_key: true

    add_index :teachers, :school_id, name: "idx_teachers_school_id"
  end
end
