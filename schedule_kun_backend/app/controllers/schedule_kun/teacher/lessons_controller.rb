class ScheduleKun::Teacher::LessonsController < ScheduleKun::Teacher::ApplicationController
  class DateNotFoundError < StandardError; end
  class LessonNotFound < StandardError; end
  class InvalidParams < StandardError; end

  # GET /schedule_kun/teacher/lessons
  def index
    raise DateNotFoundError if params[:year].blank? || params[:month].blank? || params[:day].blank?

    date = Time.zone.parse("#{params[:year]}/#{params[:month]}/#{params[:day]}")
    lessons = current_teacher.lessons.enabled.when(date).eager_load(:lesson_room, :branch, :subject).order(:start_time)

    json = lessons.each_with_object([]) do |lesson, arr|
      ret = lesson.client_attributes
      ret.merge!(lesson_room: lesson.lesson_room.client_attributes) if lesson.lesson_room.present?
      ret.merge!(branch: lesson.branch.client_attributes) if lesson.branch.present?
      ret.merge!(subject: lesson.subject.client_attributes) if lesson.subject.present?

      arr << ret
    end

    render json: json, status: 200
  rescue StandardError => e
    render_404 "#{e}"
  end

  # GET /schedule_kun/teacher/lessons/new
  def new
    branches = current_teacher.branches.enabled
    subjects = current_teacher.school.subjects.enabled

    json = { branches: [], subjects: [] }

    json[:branches] = branches.each_with_object([]) do |branch, arr|
      arr << branch.client_attributes
    end

    json[:lesson_rooms] = branches.each_with_object([]) do |branch, arr|
      arr << branch.lesson_rooms.map(&:client_attributes)
    end.flatten

    json[:subjects] = subjects.each_with_object([]) do |subject, arr|
      arr << subject.client_attributes
    end

    render json: json, status: 200
  rescue StandardError => e
    render_404 "#{e}"
  end

  # POSt /schedule_kun/teacher/lessons
  def create
    @lesson = current_teacher.lessons.build(lesson_params)
    @lesson.save!

    render status: 200
  rescue ActiveRecord::RecordInvalid => e
    response_body = {
      code: I18n.t('errors.lesson.invalid_lesson_params.code'),
      errors: @lesson.errors.each_with_object({}) { |error, arr| arr[error.attribute] = error.full_message }
    }

    render_409 response_body
  rescue StandardError => e
    render_409 "#{e}"
  end

  # GET /schedule_kun/teacher/lessons/:id/edit
  def edit
    lesson = current_teacher.lessons.enabled.where(id: params[:id]).eager_load(:lesson_room, :branch, :subject).first
    raise LessonNotFound if lesson.nil?

    json = { lesson: {}, branches: [], subjects: [], lesson_rooms: [] }

    json[:lesson] = lesson.client_attributes

    branches = current_teacher.branches.enabled
    subjects = current_teacher.school.subjects.enabled

    json[:branches] = branches.each_with_object([]) do |branch, arr|
      arr << branch.client_attributes
    end

    json[:lesson_rooms] = branches.each_with_object([]) do |branch, arr|
      arr << branch.lesson_rooms.map(&:client_attributes)
    end.flatten

    json[:subjects] = subjects.each_with_object([]) do |subject, arr|
      arr << subject.client_attributes
    end

    render json: json, status: 200
  rescue StandardError => e
    render_404 "#{e}"
  end

  # PUT /schedule_kun/teacher/lessons/:id
  def update
    @lesson = Lesson.enabled.find_by(id: params[:id])
    raise LessonNotFound if @lesson.nil?

    @lesson.update!(lesson_params)

    render status: 200
  rescue ActiveRecord::RecordInvalid => e
    response_body = {
      code: I18n.t('errors.lesson.invalid_lesson_params.code'),
      errors: @lesson.errors.each_with_object({}) { |error, arr| arr[error.attribute] = error.full_message }
    }

    render_409 response_body
  rescue StandardError => e
    render_409 "#{e}"
  end

  private

    def lesson_params
      params.require(:lesson).permit(:name, :description, :start_time, :end_time, :lesson_room_id, :branch_id, :subject_id)
    end
end
