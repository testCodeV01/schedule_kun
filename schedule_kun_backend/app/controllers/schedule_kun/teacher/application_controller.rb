class ScheduleKun::Teacher::ApplicationController < ApplicationController
  include Breath::ApplicationControllerHelper
  before_action :authenticate!
end
