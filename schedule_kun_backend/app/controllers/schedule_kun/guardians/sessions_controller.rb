module ScheduleKun
  module Guardians
    class SessionsController < ScheduleKun::Guardians::ApplicationController
      class InvalidPasswordConfirmationError < StandardError; end
      class GuardianNotFoundError < StandardError; end
      class InvalidPassword < StandardError; end

      skip_before_action :authenticate!, only: %i[new login logout]

      # GET /schedule_kun/guardians
      def new
        render status: 200
      end

      # POST /schedule_kun/guardians/login
      def login
        raise InvalidPasswordConfirmationError if params[:password] != params[:password_confirmation]

        guardian = Guardian.enabled.find_by(email: params[:email])
        raise GuardianNotFoundError if guardian.nil?
        raise InvalidPassword unless guardian.authenticate(params[:password])

        session[:guardian_id] = guardian.id

        render status: 200
      rescue StandardError => e
        render_401 e.to_s
      end

      # GET /schedule_kun/guardians/auth
      def auth
        json = { current_guardian: current_guardian&.client_attributes }

        render json: json, status: 200
      end

      # DELETE /schedule_kun/guardians/logout
      def logout
        reset_session
        @current_guardian = nil

        render statud: 200
      end
    end
  end
end
