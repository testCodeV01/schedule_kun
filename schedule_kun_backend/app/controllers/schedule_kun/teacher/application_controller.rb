class ScheduleKun::Teacher::ApplicationController < ApplicationController
  class AuthenticationError < StandardError; end

  before_action :authenticate!

  def authenticate!
    raise AuthenticationError unless session.key?(:teacher_id)
    raise AuthenticationError if current_teacher.nil?
    
    teacher = Teacher.enabled.find_by(id: session[:teacher_id])

    raise AuthenticationError if teacher.nil?
  rescue StandardError => e
    render_401 e
  end

  def current_teacher
    @current_teacher ||= Teacher.first # Teacher.enabled.find_by(id: session[:teacher_id])
  end
end
