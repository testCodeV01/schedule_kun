module DateValidator
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
