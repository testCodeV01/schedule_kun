# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
3.times do |ind_school|
  school_id = ind_school + 1

  School.seed do |s|
    s.id = school_id
    s.name = "シード学校_#{school_id}"
  end

  num_subject = Subject.enabled.all.count

  rand(1..5).times do |ind_subject|
    subject_id = num_subject + ind_subject + 1

    Subject.seed do |sub|
      sub.id = subject_id
      sub.name = "シード教科_#{subject_id}"
      sub.school_id = school_id
    end
  end

  num_buranch = Branch.enabled.all.count

  rand(1..3).times do |ind_branch|
    branch_id = num_buranch + ind_branch + 1

    Branch.seed do |b|
      b.id = branch_id
      b.name = "シード教室_#{branch_id}"
      b.school_id = school_id
    end

    num_lesson_room = LessonRoom.enabled.all.count

    rand(1..3).times do |ind_lesson_room|
      lesson_room_id = num_lesson_room + ind_lesson_room + 1

      LessonRoom.seed do |lr|
        lr.id = lesson_room_id
        lr.name = "シードレッスン教室_#{lesson_room_id}"
        lr.branch_id = branch_id
      end
    end

    num_teacher = Teacher.enabled.all.count

    rand(1..5).times do |ind_teacher|
      teacher_id = num_teacher + ind_teacher + 1

      Teacher.seed do |t|
        t.id = teacher_id
        t.name = "シード教師_#{teacher_id}"
        t.email = "teacher_#{teacher_id}@school#{school_id}.com" # teacher_1@school1.com
        t.password = "Password01"
        t.school_id = school_id
      end

      BranchTeacher.seed(
        teacher_id: teacher_id,
        branch_id: branch_id
      )

      start_date = Time.zone.now - 1.month
      end_date = Time.zone.now + 1.month

      (Date.parse(start_date.to_s)..Date.parse(end_date.to_s)).each do |date|
        next if date.strftime("%a") == "Sat" || date.strftime("%a") == "Sun"

        num_lesson = Lesson.enabled.all.count

        rand(0..5).times do |ind_lesson|
          lesson_id = num_lesson + ind_lesson + 1

          Lesson.seed do |l|
            l.id = lesson_id
            l.name = "シードレッスン_#{lesson_id}"
            l.teacher_id = teacher_id
            l.lesson_room_id = LessonRoom.enabled.where(branch_id: branch_id).sample&.id
            l.branch_id = branch_id
            l.subject_id = Subject.enabled.where(school_id: school_id).sample&.id
            l.start_time = Time.parse("#{date.strftime("%Y/%m/%d")} #{9+ind_lesson}:00:00")
            l.end_time = Time.parse("#{date.strftime("%Y/%m/%d")} #{10+ind_lesson}:00:00")
          end
        end
      end

    end
  end
end
