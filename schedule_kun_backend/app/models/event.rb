class Event < ApplicationRecord
  include DateValidator
  include SoftDeleter

  belongs_to :lesson_room, optional: true
  belongs_to :teacher, optional: true

  validates :start_time, :end_time, presence: true
  validate :validate_end_after_start
  validate :validate_start_and_end_same_day
end
