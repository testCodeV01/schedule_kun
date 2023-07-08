class Lesson < ApplicationRecord
  include DateValidator

  belongs_to :branch
  belongs_to :teacher, optional: true
  belongs_to :lesson_room, optional: true
  belongs_to :subject, optional: true
  has_many :absences, dependent: :destroy
  has_many :lesson_students, dependent: :destroy
  has_many :students, through: :lesson_students

  validates :start_time, :end_time, presence: true
  validate :validate_end_after_start
  validate :validate_start_and_end_same_day
  validate :validate_schedule_span

  scope :between_date, -> (start_date, end_date) {
    where(start_time: Range.new(start_date.beginning_of_day, end_date.end_of_day))
  }

  scope :between_time, -> (start_time, end_time) {
    where("start_time >= ?", start_time).where("end_time <= ?", end_time)
  }

  scope :overlap_time, -> (start_time, end_time) {
    where("end_time > ?", start_time).where("start_time <= ?", start_time)
    .or(Lesson.where("start_time >= ?", start_time).where("end_time <= ?", end_time))
    .or(Lesson.where("start_time < ?", end_time).where("end_time >= ?", end_time))
  }

  scope :when, -> (date) {
    where("start_time >= ?", date.beginning_of_day).where("end_time <= ?", date.end_of_day)
  }

  def client_attributes
    default_client_attributes
    .except(:start_time, :end_time)
    .merge!(start_time: start_time.strftime("%H:%M"), end_time: end_time.strftime("%H:%M"))
    .merge!(lesson_date: start_time.strftime("%Y/%m/%d"))
  end

  private

    def validate_schedule_span
      overlap_lessons = self.class.where(teacher_id: teacher_id).overlap_time(start_time, end_time).where.not(id: id).enabled  
      errors.add(:both_time, "を確認してください。既に登録済みのレッスンとかぶってしまうようです。") if overlap_lessons.present?
    end
end
