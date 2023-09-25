class CreateLessons < ActiveRecord::Migration[7.0]
  def change
    create_table :lessons do |t|
      t.references :teacher, foreign_key: true
      t.references :lesson_room, foreign_key: true
      t.references :branch, null: false, foreign_key: true
      t.string :name, null: false, default: ""
      t.string :description, null: false, default: ""
      t.timestamp :start_time, null: false, default: Time.zone.now
      t.timestamp :end_time, null: false, default: Time.zone.now

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :lessons, :start_time, name: "idx_lessons_1"
    add_index :lessons, :end_time, name: "idx_lessons_2"
    add_index :lessons, :teacher_id, name: "idx_lessons_3"
    add_index :lessons, :lesson_room_id, name: "idx_lessons_4"
  end
end
