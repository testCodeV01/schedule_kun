require "rails_helper"

RSpec.describe "ScheduleKun::Teacher::Lessons", type: :request do
  include_context "teacher_auth_mock", ScheduleKun::Teacher::LessonsController

  describe "GET /schedule_kun/teacher/lessons" do
    context "success" do
      it "ステータス200を返すこと" do
        query = { year: Time.zone.now.year, month: Time.zone.now.month, day: Time.zone.now.day }
        get schedule_kun_teacher_lessons_path, params: query
        expect(response).to have_http_status(200)
      end

      it "ログイン中教師の担当レッスンのみ取得できること" do
        query = { year: Time.zone.now.year, month: Time.zone.now.month, day: Time.zone.now.day }
        get schedule_kun_teacher_lessons_path, params: query
        expect(JSON.parse(response.body).map { |res| res["teacher_id"] }.uniq).to eq([teacher.id]).or eq([])
      end

      it "指定した日付のレッスンのみ取得できていること" do
        query = { year: Time.zone.now.year, month: Time.zone.now.month, day: Time.zone.now.day }
        get schedule_kun_teacher_lessons_path, params: query
        expect(JSON.parse(response.body).map { |res| res["lesson_date"] }.uniq).to eq([Time.zone.now.strftime("%Y/%m/%d")]).or eq([])
      end
    end

    context "failure" do
      it "クエリのyearが不足していたらエラーを404返すこと" do
        query = { month: Time.zone.now.month, day: Time.zone.now.day }
        get schedule_kun_teacher_lessons_path, params: query
        expect(response).to have_http_status(404)
      end

      it "クエリのmonthが不足していたらエラーを404返すこと" do
        query = { year: Time.zone.now.year, day: Time.zone.now.day }
        get schedule_kun_teacher_lessons_path, params: query
        expect(response).to have_http_status(404)
      end

      it "クエリのdayが不足していたらエラーを404返すこと" do
        query = { year: Time.zone.now.year, month: Time.zone.now.month }
        get schedule_kun_teacher_lessons_path, params: query
        expect(response).to have_http_status(404)
      end
    end
  end

  describe "GET /schedule_kun/teacher/lessons/new" do
    context "success" do
      it "ステータス200を返すこと" do
        get new_schedule_kun_teacher_lesson_path
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "POST /schedule_kun/teacher/lessons" do
    let(:query) {
      school = teacher.school
      branch = school.branches.first
      lesson_room = branch.lesson_rooms.first
      subject = school.subjects.first
      start_time = "#{Time.zone.now.strftime("%Y/%m/%d")} 16:00:00"
      end_time = "#{Time.zone.now.strftime("%Y/%m/%d")} 17:00:00"

      {
        lesson: {
          name: "テストレッスン",
          description: "詳細",
          start_time: start_time,
          end_time: end_time,
          branch_id: branch.id,
          lesson_room_id: lesson_room.id,
          subject_id: subject.id
        }
      }
    }

    context "success" do
      it "ステータス200を返すこと" do
        post schedule_kun_teacher_lessons_path, params: query
        expect(response).to have_http_status(200)
      end
    end

    context "failure: 終了時間が開始時間より前の時" do
      before do
        query[:lesson][:end_time] = "#{Time.zone.now.strftime("%Y/%m/%d")} 15:00:00"
      end

      it "ステータス409を返すこと" do
        post schedule_kun_teacher_lessons_path, params: query
        expect(response).to have_http_status(409)
      end

      it "レスポンスにcodeを含むこと" do
        post schedule_kun_teacher_lessons_path, params: query
        expect(JSON.parse(response.body).deep_symbolize_keys.key?(:code)).to be_truthy
      end

      it "レスポンスにerrorsを含むこと" do
        post schedule_kun_teacher_lessons_path, params: query
        expect(JSON.parse(response.body).deep_symbolize_keys.key?(:errors)).to be_truthy
      end
    end
  end

  describe "GET /schedule_kun/teacher/lessons/:id/edit" do
    context "sucdess" do
      let(:lesson) { teacher.lessons.first }

      it "ステータス200を返すこと" do
        get edit_schedule_kun_teacher_lesson_path(lesson.id)
        expect(response).to have_http_status(200)
      end
    end

    context "failure" do
      it "存在しないレッスンIDは404エラーとなること" do
        get edit_schedule_kun_teacher_lesson_path(9999)
        expect(response).to have_http_status(404)
      end
    end
  end

  describe "PUT /schedule_kun/teacher/lessons/:id" do
    let(:lesson) { teacher.lessons.first }
    let(:query) {
      school = teacher.school
      branch = school.branches.first
      lesson_room = branch.lesson_rooms.first
      subject = school.subjects.first
      start_time = "#{Time.zone.now.strftime("%Y/%m/%d")} 16:00:00"
      end_time = "#{Time.zone.now.strftime("%Y/%m/%d")} 17:00:00"

      {
        lesson: {
          name: "テストレッスン",
          description: "詳細",
          start_time: start_time,
          end_time: end_time,
          branch_id: branch.id,
          lesson_room_id: lesson_room.id,
          subject_id: subject.id
        }
      }
    }

    context "success" do
      it "ステータス200を返すこと" do
        put schedule_kun_teacher_lesson_path(lesson.id), params: query
        expect(response).to have_http_status(200)
      end
    end

    context "failure" do
      context "存在しないレッスンIDが指定された場合" do
        it "409エラーを返すこと" do
          put schedule_kun_teacher_lesson_path(9999), params: query
          expect(response).to have_http_status(409)
        end
      end

      context "終了時間が開始時間より前の場合" do
        before do
          query[:lesson][:end_time] = "#{Time.zone.now.strftime("%Y/%m/%d")} 15:00:00"
        end

        it "409エラーを返すこと" do
          put schedule_kun_teacher_lesson_path(lesson.id), params: query
          expect(response).to have_http_status(409)
        end

        it "レスポンスにcodeを含むこと" do
          put schedule_kun_teacher_lesson_path(lesson.id), params: query
          expect(JSON.parse(response.body).deep_symbolize_keys.key?(:code)).to be_truthy
        end

        it "レスポンスにerrorsを含むこと" do
          put schedule_kun_teacher_lesson_path(lesson.id), params: query
          expect(JSON.parse(response.body).deep_symbolize_keys.key?(:errors)).to be_truthy
        end
      end
    end
  end

  describe "DELETE /schedule_kun/teacher/lessons/:id" do
    let(:lesson) { teacher.lessons.first }

    context "success" do
      it "ステータス200を返すこと" do
        delete schedule_kun_teacher_lesson_path(lesson.id)
        expect(response).to have_http_status(200)
      end

      context "論理削除されていること" do
        it "データが残っていること" do
          delete schedule_kun_teacher_lesson_path(lesson.id)
          expect(lesson.reload.present?).to be_truthy
        end

        it "enabledを付けると読み込めないこと" do
          delete schedule_kun_teacher_lesson_path(lesson.id)
          expect(Lesson.enabled.find_by(id: lesson.id).present?).to be_falsey
        end
      end
    end

    context "failure" do
      it "存在しないレッスンIDが指定された場合、409エラーを返すこと" do
        delete schedule_kun_teacher_lesson_path(9999)
        expect(response).to have_http_status(409)
      end
    end
  end
end
