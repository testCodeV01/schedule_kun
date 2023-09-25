class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.references :branch, foreign_key: true
      t.string :name, null: false, default: ""

      t.string :deleter_type
      t.integer :deleter_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :groups, :branch_id, name: "idx_groups_1"
  end
end
