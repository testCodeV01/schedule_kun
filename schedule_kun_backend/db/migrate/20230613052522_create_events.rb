class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.references :lesson_room, foreign_key: true
      t.references :teacher, foreign_key: true
      t.string :name, null: false, default: ""
      t.string :description, null: false, default: ""
      t.string :place, null: false, default: ""
      t.timestamp :start_time, null: false, default: Time.zone.now
      t.timestamp :end_time, null: false, default: Time.zone.now

      t.integer :delf, limit: 2, default: 0 # 0:通常, 1:削除
      t.integer :deleted_account_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.datetime :deleted_at
      t.integer :deleted_account_id

      t.timestamps
    end

    add_index :events, :lesson_room_id, name: "idx_events_1"
    add_index :events, :teacher_id, name: "idx_events_2"
  end
end
