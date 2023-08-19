class ScheduleKun::Teachers::ApplicationController < ApplicationController
  include Breath::ApplicationControllerHelper
  before_action :authenticate!
end
