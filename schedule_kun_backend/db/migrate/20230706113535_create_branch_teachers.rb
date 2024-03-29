class CreateBranchTeachers < ActiveRecord::Migration[7.0]
  def change
    create_table :branch_teachers do |t|
      t.references :branch, null: false, foreign_key: true
      t.references :teacher, null: false, foreign_key: true

      t.string :deleter_type
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :branch_teachers, :branch_id, name: "idx_branch_teachers_1"
    add_index :branch_teachers, :teacher_id, name: "idx_branch_teachers_2"
  end
end
