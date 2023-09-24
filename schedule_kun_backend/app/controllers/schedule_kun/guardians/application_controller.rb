module ScheduleKun
  module Guardians
    class ApplicationController < ApplicationController
      include Breath::ApplicationControllerHelper
      before_action :authenticate!

      crsf_protect true
    end
  end
end
