require "rails_helper"

RSpec.describe "ScheduleKun::Teachers::Calendars", type: :request do
  include_context "teacher_auth_mock", ScheduleKun::Teachers::CalendarsController

  describe "GET /schedule_kun/teachers/calendars/month" do
    context "success" do
      it "ステータス200を返すこと" do
        query = { year: Time.zone.now.year, month: Time.zone.now.month }
        get schedule_kun_teachers_calendars_month_path, params: query
        expect(response).to have_http_status(200)
      end
    end

    context "failure" do
      it "クエリyearが不足場合に404エラーとなること" do
        query = { month: Time.zone.now.month }
        get schedule_kun_teachers_calendars_month_path, params: query
        expect(response).to have_http_status(404)
      end

      it "クエリmonthが不足場合に404エラーとなること" do
        query = { year: Time.zone.now.year }
        get schedule_kun_teachers_calendars_month_path, params: query
        expect(response).to have_http_status(404)
      end
    end
  end

  describe "GET /schedule_kun/teachers/calendars/week" do
    context "success" do
      it "ステータス200を返すこと" do
        query = { year: Time.zone.now.year, month: Time.zone.now.month, day: Time.zone.now.day }
        get schedule_kun_teachers_calendars_week_path, params: query
        expect(response).to have_http_status(200)
      end
    end

    context "failure" do
      it "クエリyearが不足場合に404エラーとなること" do
        query = { month: Time.zone.now.month, day: Time.zone.now.day }
        get schedule_kun_teachers_calendars_week_path, params: query
        expect(response).to have_http_status(404)
      end

      it "クエリmonthが不足場合に404エラーとなること" do
        query = { year: Time.zone.now.year, day: Time.zone.now.day }
        get schedule_kun_teachers_calendars_week_path, params: query
        expect(response).to have_http_status(404)
      end

      it "クエリdayが不足場合に404エラーとなること" do
        query = { year: Time.zone.now.year, month: Time.zone.now.month }
        get schedule_kun_teachers_calendars_week_path, params: query
        expect(response).to have_http_status(404)
      end
    end
  end
end
