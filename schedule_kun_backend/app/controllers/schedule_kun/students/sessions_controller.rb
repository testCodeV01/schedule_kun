module ScheduleKun
  module Students
    class SessionsController < ScheduleKun::Students::ApplicationController
      include Breath::SessionsControllerHelper

      # GET /schedule_kun/students/auth
      def auth
        json = { current_student: current_student&.client_attributes }

        render json: json, status: 200
      end
    end
  end
end
