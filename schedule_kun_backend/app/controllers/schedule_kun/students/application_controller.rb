class ScheduleKun::Students::ApplicationController < ApplicationController
  class AuthenticationError < StandardError; end

  before_action :authenticate!

  def authenticate!
    raise AuthenticationError unless session.key?(:student_id)
    raise AuthenticationError if current_student.nil?
    
    student = Student.enabled.find_by(id: session[:student_id])

    raise AuthenticationError if student.nil?
  rescue StandardError => e
    render_401 e
  end

  def current_student
    @current_student ||= Student.enabled.find_by(id: session[:student_id])
  end
end
