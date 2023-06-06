class ScheduleKun::Teacher::SessionsController < ScheduleKun::Teacher::ApplicationController
  class InvalidPasswordConfirmationError < StandardError; end
  class TeacherNotFoundError < StandardError; end

  skip_before_action :authenticate!, only: %i(new login logout)

  # GET /schedule_kun/teacher
  def new
    render status:200
  end

  # POST /schedule_kun/teacher/login
  def login
    raise InvalidPasswordConfirmationError if params[:password] != params[:password_confirmation]
    
    teacher = Teacher.enabled.find_by(email: params[:email])
    raise TeacherNotFoundError if teacher.nil?

    session[:teacher_id] = teacher.id

    render status: 200
  rescue StandardError => e
    render_401 "#{e}"
  end

  # GET /schedule_kun/teacher/auth
  def auth
    json = { current_teacher: current_teacher&.client_attributes }

    render json: json, status: 200
  end

  # DELETE /schedule_kun/teacher/logout
  def logout
    reset_session
    @current_teacher = nil

    render statud: 200
  end
end
