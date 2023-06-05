class SessionsController < ApplicationController

  # GET /
  def new
    render status:200
  end

  def create
    render status: 200
  rescue StandardError => e
    render_401 "#{e}"
  end
end
