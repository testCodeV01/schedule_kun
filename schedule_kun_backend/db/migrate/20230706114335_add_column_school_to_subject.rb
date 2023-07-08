class AddColumnSchoolToSubject < ActiveRecord::Migration[7.0]
  def change
    add_reference :subjects, :school, foreign_key: true

    add_index :subjects, :school_id, name: "idx_subjects_school_id"
  end
end
