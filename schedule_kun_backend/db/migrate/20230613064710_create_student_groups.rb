class CreateStudentGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :student_groups do |t|
      t.references :student, foreign_key: true
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end
