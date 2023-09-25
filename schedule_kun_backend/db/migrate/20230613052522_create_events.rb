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

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :events, :lesson_room_id, name: "idx_events_1"
    add_index :events, :teacher_id, name: "idx_events_2"
  end
end
