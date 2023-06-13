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

      t.timestamps
    end

    add_index :events, :lesson_room_id, name: "idx_events_1"
    add_index :events, :teacher_id, name: "idx_events_2"
  end
end
