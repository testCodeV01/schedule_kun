class CreateHolidays < ActiveRecord::Migration[7.0]
  def change
    create_table :holidays do |t|
      t.references :school, foreign_key: true
      t.timestamp :day, null: false, default: Time.zone.now.beginning_of_day

      t.integer :delf, limit: 2, default: 0 # 0:通常, 1:削除
      t.integer :deleted_account_type, limit: 2, default: 0 # 0:Teacher, 1:Student, 2:Guardian
      t.datetime :deleted_at
      t.integer :deleted_account_id

      t.timestamps
    end

    add_index :holidays, :school_id, name: "idx_holidays_1"
    add_index :holidays, [:school_id, :day], unique: true
  end
end
