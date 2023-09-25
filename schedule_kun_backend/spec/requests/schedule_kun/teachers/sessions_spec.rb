require "rails_helper"

RSpec.describe "ScheduleKun::Teachers::Sessions", type: :request do
  describe "GET /schedule_kun/teachers/login" do
    it "ステータス200を返すこと" do
      get schedule_kun_teachers_login_path
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /schedule_kun/teachers/login" do
    let(:teacher) { create(:teacher) }

    before do
      allow_any_instance_of(ScheduleKun::Teachers::SessionsController).to receive(:verify_authenticity_token).and_return(true)
    end

    context "success" do
      it "ステータス200を返すこと" do
        login_params = { sessions: { email: teacher.email, password: "Password01" } }
        post schedule_kun_teachers_login_path, params: login_params
        expect(response).to have_http_status(200)
      end
    end

    context "failure" do
      it "パスワードが間違っていた場合に401エラーとなること" do
        login_params = { sessions: { email: teacher.email, password: "Password02" } }
        post schedule_kun_teachers_login_path, params: login_params
        expect(response).to have_http_status(401)
      end

      it "Eメールが間違っていたら401エラーとなること" do
        login_params = { sessions: { email: "teacher@sample.com", password: "Password01" } }
        post schedule_kun_teachers_login_path, params: login_params
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "GET /schedule_kun/teachers/auth" do
    include_context "teacher_auth_mock", ScheduleKun::Teachers::SessionsController

    it "ステータス200を返すこと" do
      get schedule_kun_teachers_auth_path
      expect(response).to have_http_status(200)
    end

    it "ログイン中の教師の情報のJsonを返すこと" do
      get schedule_kun_teachers_auth_path
      expect(JSON.parse(response.body)).to eq({ current_teacher: teacher.client_attributes }.deep_stringify_keys)
    end
  end

  describe "DELETE /schedule_kun/teachers/logout" do
    include_context "teacher_auth_mock", ScheduleKun::Teachers::SessionsController

    context "success" do
      it "ステータス200を返すこと" do
        delete schedule_kun_teachers_logout_path
        expect(response).to have_http_status(200)
      end
    end
  end
end
