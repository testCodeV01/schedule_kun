module ScheduleKun
  module Students
    class ApplicationController < ApplicationController
      include Breath::ApplicationControllerHelper
      before_action :authenticate!

      crsf_protect true
    end
  end
end
