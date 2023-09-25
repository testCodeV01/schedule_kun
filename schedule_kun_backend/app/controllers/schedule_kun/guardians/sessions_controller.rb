module ScheduleKun
  module Guardians
    class SessionsController < ScheduleKun::Guardians::ApplicationController
      include Breath::SessionsControllerHelper

      skip_before_action :authenticate!, only: %i[new login logout]

      # GET /schedule_kun/guardians/auth
      def auth
        json = { current_guardian: current_guardian&.client_attributes }

        render json: json, status: 200
      end
    end
  end
end
