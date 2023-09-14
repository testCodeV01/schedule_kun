module ScheduleKun
  module Teachers
    class ApplicationController < ApplicationController
      include Breath::ApplicationControllerHelper
      before_action :authenticate!
    end
  end
end
