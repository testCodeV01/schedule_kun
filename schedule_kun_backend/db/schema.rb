# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_05_115128) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "guardians", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "password", default: "", null: false
    t.string "name", default: "", null: false
    t.integer "delf", limit: 2, default: 0
    t.integer "deleted_account_type", limit: 2, default: 0
    t.datetime "deleted_at"
    t.integer "deleted_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "deleted_at"], name: "index_guardians_on_email_and_deleted_at", unique: true
    t.index ["email"], name: "idx_guardians_1"
  end

  create_table "student_guardians", force: :cascade do |t|
    t.bigint "student_id", null: false
    t.bigint "guardian_id", null: false
    t.integer "delf", limit: 2, default: 0
    t.integer "deleted_account_type", limit: 2, default: 0
    t.datetime "deleted_at"
    t.integer "deleted_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guardian_id"], name: "index_student_guardians_on_guardian_id"
    t.index ["student_id"], name: "index_student_guardians_on_student_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "password", default: "", null: false
    t.string "name", default: "", null: false
    t.integer "delf", limit: 2, default: 0
    t.integer "deleted_account_type", limit: 2, default: 0
    t.datetime "deleted_at"
    t.integer "deleted_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "deleted_at"], name: "index_students_on_email_and_deleted_at", unique: true
    t.index ["email"], name: "idx_studnets_1"
  end

  create_table "teachers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "password", default: "", null: false
    t.string "name", default: "", null: false
    t.integer "delf", limit: 2, default: 0
    t.integer "deleted_account_type", limit: 2, default: 0
    t.datetime "deleted_at"
    t.integer "deleted_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "deleted_at"], name: "index_teachers_on_email_and_deleted_at", unique: true
    t.index ["email"], name: "idx_teachers_1"
  end

  add_foreign_key "student_guardians", "guardians"
  add_foreign_key "student_guardians", "students"
end
