require "rails_helper"

RSpec.describe "ScheduleKun::Teacher::Sessions", type: :request do
  describe "GET /schedule_kun/teacher" do
    it "ステータス200を返すこと" do
      get schedule_kun_teacher_path
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /schedule_kun/teacher/login" do
    let(:teacher) { create(:teacher) }

    before do
      allow_any_instance_of(ScheduleKun::Teacher::SessionsController).to receive(:verify_authenticity_token).and_return(true)
    end

    context "success" do
      it "ステータス200を返すこと" do
        login_params = { email: teacher.email, password: teacher.password, password_confirmation: teacher.password }
        post schedule_kun_teacher_login_path, params: login_params
        expect(response).to have_http_status(200)
      end
    end

    context "failure" do
      it "パスワード確認がパスワードと一致しなかった場合に401エラーとなること" do
        login_params = { email: teacher.email, password: teacher.password, password_confirmation: "password" }
        post schedule_kun_teacher_login_path, params: login_params
        expect(response).to have_http_status(401)
      end

      it "Eメールが間違っていたら401エラーとなること" do
        login_params = { email: "teacher@sample.com", password: teacher.password, password_confirmation: teacher.password }
        post schedule_kun_teacher_login_path, params: login_params
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "GET /schedule_kun/teachers/auth" do
    include_context "teacher_auth_mock", ScheduleKun::Teacher::SessionsController

    it "ステータス200を返すこと" do
      get schedule_kun_teacher_auth_path
      expect(response).to have_http_status(200)
    end

    it "ログイン中の教師の情報のJsonを返すこと" do
      get schedule_kun_teacher_auth_path
      expect(JSON.parse(response.body)).to eq({ current_teacher: teacher.client_attributes }.deep_stringify_keys)
    end
  end

  describe "DELETE /schedule_kun/teachers/logout" do
    include_context "teacher_auth_mock", ScheduleKun::Teacher::SessionsController

    context "success" do
      it "ステータス200を返すこと" do
        delete schedule_kun_teacher_logout_path
        expect(response).to have_http_status(200)
      end
    end
  end
end
