module ScheduleKun
  module Students
    class SessionsController < ScheduleKun::Students::ApplicationController
      class InvalidPasswordConfirmationError < StandardError; end
      class StudentNotFoundError < StandardError; end
      class InvalidPassword < StandardError; end

      skip_before_action :authenticate!, only: %i[new login logout]

      # GET /schedule_kun/students
      def new
        render status: 200
      end

      # POST /schedule_kun/students/login
      def login
        raise InvalidPasswordConfirmationError if params[:password] != params[:password_confirmation]

        student = Student.enabled.find_by(email: params[:email])
        raise StudentNotFoundError if student.nil?
        raise InvalidPassword unless student.authenticate(params[:password])

        session[:student_id] = student.id

        render status: 200
      rescue StandardError => e
        render_401 e.to_s
      end

      # GET /schedule_kun/students/auth
      def auth
        json = { current_student: current_student&.client_attributes }

        render json: json, status: 200
      end

      # DELETE /schedule_kun/students/logout
      def logout
        reset_session
        @current_student = nil

        render statud: 200
      end
    end
  end
end
