class Lesson < ApplicationRecord
  include DateValidator

  belongs_to :branch
  belongs_to :teacher, optional: true
  belongs_to :lesson_room, optional: true
  has_many :absences, dependent: :destroy
  has_many :lesson_students, dependent: :destroy
  has_many :students, through: :lesson_students

  validates :start_time, :end_time, presence: true
  validate :validate_end_after_start
  validate :validate_start_and_end_same_day
end
