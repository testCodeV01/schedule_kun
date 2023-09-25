class CreateHolidays < ActiveRecord::Migration[7.0]
  def change
    create_table :holidays do |t|
      t.references :school, foreign_key: true
      t.timestamp :day, null: false, default: Time.zone.now.beginning_of_day

      t.string :deleter_type, comment: "論理削除を実行したモデル名"
      t.integer :deleter_id, comment: "論理削除を実行したモデルのID"
      t.datetime :deleted_at, comment: "論理削除の実行日時"

      t.timestamps
    end

    add_index :holidays, :school_id, name: "idx_holidays_1"
    add_index :holidays, [:school_id, :day], unique: true
  end
end
