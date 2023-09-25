class CreateHolidays < ActiveRecord::Migration[7.0]
  def change
    create_table :holidays do |t|
      t.references :school, foreign_key: true
      t.timestamp :day, null: false, default: Time.zone.now.beginning_of_day

      t.string :deleter_type
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :holidays, :school_id, name: "idx_holidays_1"
    add_index :holidays, [:school_id, :day], unique: true
  end
end
