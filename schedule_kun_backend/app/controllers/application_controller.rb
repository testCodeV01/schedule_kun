class ApplicationController < ActionController::API
  rescue_from ActionController::RoutingError, with: :render_404
  rescue_from Exception, with: :render_500
end
