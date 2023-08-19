class ScheduleKun::Teacher::SessionsController < ScheduleKun::Teacher::ApplicationController
  include Breath::SessionsControllerHelper

  # GET /schedule_kun/teacher/auth
  def auth
    json = { current_teacher: current_teacher&.client_attributes }

    render json: json, status: 200
  end
end
