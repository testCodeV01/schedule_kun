class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::RequestForgeryProtection
  include ActionController::Cookies

  protect_from_forgery with: :exception

  after_action :set_csrf_token_header

  rescue_from ActionController::RoutingError, with: :render_404
  rescue_from Exception, with: :render_500

  def set_csrf_token_header
    response.header["X-CSRF-Token"] = form_authenticity_token
  end

  def render_400(res)
    Rails.logger.error error_message(res)

    render json: res, status: 400
  end

  def render_401(res)
    Rails.logger.error error_message(res)

    render json: res, status: 401
  end

  def render_404(res)
    Rails.logger.error error_message(res)

    render json: res, status: 404
  end

  def render_409(res)
    Rails.logger.error error_message(res)

    render json: res, status: 409
  end

  def render_500(res)
    Rails.logger.error error_message(res)

    render json: res, status: 500
  end

  def error_message(error)
    "[ERROR] #{error.to_s}"
  end
end
