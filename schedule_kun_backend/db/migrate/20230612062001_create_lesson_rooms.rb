class CreateLessonRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :lesson_rooms do |t|
      t.references :branch, null: false, foreign_key: true
      t.string :name, null: false, default: ""

      t.integer :deleter_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
