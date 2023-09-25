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

ActiveRecord::Schema[7.0].define(version: 2023_07_06_114335) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "absences", force: :cascade do |t|
    t.bigint "student_id"
    t.bigint "lesson_id"
    t.string "description", default: "", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "idx_absences_2"
    t.index ["lesson_id"], name: "index_absences_on_lesson_id"
    t.index ["student_id"], name: "idx_absences_1"
    t.index ["student_id"], name: "index_absences_on_student_id"
  end

  create_table "branch_teachers", force: :cascade do |t|
    t.bigint "branch_id", null: false
    t.bigint "teacher_id", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["branch_id"], name: "idx_branch_teachers_1"
    t.index ["branch_id"], name: "index_branch_teachers_on_branch_id"
    t.index ["teacher_id"], name: "idx_branch_teachers_2"
    t.index ["teacher_id"], name: "index_branch_teachers_on_teacher_id"
  end

  create_table "branches", force: :cascade do |t|
    t.bigint "school_id", null: false
    t.string "name", default: "", null: false
    t.string "zip_code", default: "", null: false
    t.string "address", default: "", null: false
    t.string "phone_number", default: "", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["school_id"], name: "idx_branches_1"
    t.index ["school_id"], name: "index_branches_on_school_id"
  end

  create_table "events", force: :cascade do |t|
    t.bigint "lesson_room_id"
    t.bigint "teacher_id"
    t.string "name", default: "", null: false
    t.string "description", default: "", null: false
    t.string "place", default: "", null: false
    t.datetime "start_time", precision: nil, default: "2023-09-24 21:05:40", null: false
    t.datetime "end_time", precision: nil, default: "2023-09-24 21:05:40", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_room_id"], name: "idx_events_1"
    t.index ["lesson_room_id"], name: "index_events_on_lesson_room_id"
    t.index ["teacher_id"], name: "idx_events_2"
    t.index ["teacher_id"], name: "index_events_on_teacher_id"
  end

  create_table "groups", force: :cascade do |t|
    t.bigint "branch_id"
    t.string "name", default: "", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["branch_id"], name: "idx_groups_1"
    t.index ["branch_id"], name: "index_groups_on_branch_id"
  end

  create_table "guardians", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "password_digest", default: "", null: false
    t.string "remember_digest"
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "deleted_at"], name: "index_guardians_on_email_and_deleted_at", unique: true
    t.index ["email"], name: "idx_guardians_1"
  end

  create_table "holidays", force: :cascade do |t|
    t.bigint "school_id"
    t.datetime "day", precision: nil, default: "2023-09-24 00:00:00", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["school_id", "day"], name: "index_holidays_on_school_id_and_day", unique: true
    t.index ["school_id"], name: "idx_holidays_1"
    t.index ["school_id"], name: "index_holidays_on_school_id"
  end

  create_table "lesson_rooms", force: :cascade do |t|
    t.bigint "branch_id", null: false
    t.string "name", default: "", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["branch_id"], name: "index_lesson_rooms_on_branch_id"
  end

  create_table "lesson_students", force: :cascade do |t|
    t.bigint "lesson_id"
    t.bigint "student_id"
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "idx_lesson_students_1"
    t.index ["lesson_id"], name: "index_lesson_students_on_lesson_id"
    t.index ["student_id"], name: "idx_lesson_students_2"
    t.index ["student_id"], name: "index_lesson_students_on_student_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.bigint "teacher_id"
    t.bigint "lesson_room_id"
    t.bigint "branch_id", null: false
    t.string "name", default: "", null: false
    t.string "description", default: "", null: false
    t.datetime "start_time", precision: nil, default: "2023-09-24 21:05:40", null: false
    t.datetime "end_time", precision: nil, default: "2023-09-24 21:05:40", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "subject_id"
    t.index ["branch_id"], name: "index_lessons_on_branch_id"
    t.index ["end_time"], name: "idx_lessons_2"
    t.index ["lesson_room_id"], name: "idx_lessons_4"
    t.index ["lesson_room_id"], name: "index_lessons_on_lesson_room_id"
    t.index ["start_time"], name: "idx_lessons_1"
    t.index ["subject_id"], name: "idx_lessons_subject_id"
    t.index ["subject_id"], name: "index_lessons_on_subject_id"
    t.index ["teacher_id"], name: "idx_lessons_3"
    t.index ["teacher_id"], name: "index_lessons_on_teacher_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "zip_code", default: "", null: false
    t.string "address", default: "", null: false
    t.string "phone_number", default: "", null: false
    t.string "description", default: "", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "student_groups", force: :cascade do |t|
    t.bigint "student_id"
    t.bigint "group_id"
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "idx_student_groups_2"
    t.index ["group_id"], name: "index_student_groups_on_group_id"
    t.index ["student_id"], name: "idx_student_groups_1"
    t.index ["student_id"], name: "index_student_groups_on_student_id"
  end

  create_table "student_guardians", force: :cascade do |t|
    t.bigint "student_id", null: false
    t.bigint "guardian_id", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guardian_id"], name: "idx_student_guardians_2"
    t.index ["guardian_id"], name: "index_student_guardians_on_guardian_id"
    t.index ["student_id"], name: "idx_student_guardians_1"
    t.index ["student_id"], name: "index_student_guardians_on_student_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "password_digest", default: "", null: false
    t.string "remember_digest"
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "deleted_at"], name: "index_students_on_email_and_deleted_at", unique: true
    t.index ["email"], name: "idx_studnets_1"
  end

  create_table "subjects", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "description", default: "", null: false
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "school_id"
    t.index ["school_id"], name: "idx_subjects_school_id"
    t.index ["school_id"], name: "index_subjects_on_school_id"
  end

  create_table "teachers", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "password_digest", default: "", null: false
    t.string "remember_digest"
    t.integer "deleter_type", limit: 2, default: 0
    t.integer "deleter_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "school_id"
    t.index ["email", "deleted_at"], name: "index_teachers_on_email_and_deleted_at", unique: true
    t.index ["email"], name: "idx_teachers_1"
    t.index ["school_id"], name: "idx_teachers_school_id"
    t.index ["school_id"], name: "index_teachers_on_school_id"
  end

  add_foreign_key "absences", "lessons"
  add_foreign_key "absences", "students"
  add_foreign_key "branch_teachers", "branches"
  add_foreign_key "branch_teachers", "teachers"
  add_foreign_key "branches", "schools"
  add_foreign_key "events", "lesson_rooms"
  add_foreign_key "events", "teachers"
  add_foreign_key "groups", "branches"
  add_foreign_key "holidays", "schools"
  add_foreign_key "lesson_rooms", "branches"
  add_foreign_key "lesson_students", "lessons"
  add_foreign_key "lesson_students", "students"
  add_foreign_key "lessons", "branches"
  add_foreign_key "lessons", "lesson_rooms"
  add_foreign_key "lessons", "subjects"
  add_foreign_key "lessons", "teachers"
  add_foreign_key "student_groups", "groups"
  add_foreign_key "student_groups", "students"
  add_foreign_key "student_guardians", "guardians"
  add_foreign_key "student_guardians", "students"
  add_foreign_key "subjects", "schools"
  add_foreign_key "teachers", "schools"
end
