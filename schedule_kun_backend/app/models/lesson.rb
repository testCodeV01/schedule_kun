class Lesson < ApplicationRecord
  belongs_to :branch
  belongs_to :teacher, optional: true
  belongs_to :lesson_room, optional: true

  validates :start_time, :end_time, presence: true
  validate :validate_end_after_start
  validate :validate_start_and_end_same_day

  private

    def validate_end_after_start
      return if end_time.blank? || start_time.blank?

      errors.add(:end_time, "は開始日より後の日時にしてください。") if end_time < start_time
    end

    def validate_start_and_end_same_day
      return if end_time.blank? || start_time.blank?

      unless start_time.year == end_time.year &&
      start_time.month == end_time.month &&
      start_time.day == end_time.day
        errors.add(:end_time, "は開始日と同じ日付にしてください。")
      end
    end
end
