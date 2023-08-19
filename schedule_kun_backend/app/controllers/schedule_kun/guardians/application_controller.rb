class ScheduleKun::Guardians::ApplicationController < ApplicationController
  class AuthenticationError < StandardError; end

  before_action :authenticate!

  def authenticate!
    raise AuthenticationError unless session.key?(:guardian_id)
    raise AuthenticationError if current_guardian.nil?
    
    guardian = Guardian.enabled.find_by(id: session[:guardian_id])

    raise AuthenticationError if guardian.nil?
  rescue StandardError => e
    render_401 e
  end

  def current_guardian
    @current_guardian ||= Guardian.enabled.find_by(id: session[:guardian_id])
  end
end
