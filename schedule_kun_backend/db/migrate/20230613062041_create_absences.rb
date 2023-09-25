class CreateAbsences < ActiveRecord::Migration[7.0]
  def change
    create_table :absences do |t|
      t.references :student, foreign_key: true
      t.references :lesson, foreign_key: true
      t.string :description, null: false, default: ""

      t.integer :deleter_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :absences, :student_id, name: "idx_absences_1"
    add_index :absences, :lesson_id, name: "idx_absences_2"
  end
end
