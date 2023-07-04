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

  scope :between_date, -> (start_date, end_date) {
    where(start_time: Range.new(start_date.beginning_of_day, end_date.end_of_day))
  }

  scope :between_time, -> (start_time, end_time) {
    where("start_time >= ?", start_time).where("end_time <= ?", end_time)
  }
end
