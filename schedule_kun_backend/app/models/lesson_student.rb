class LessonStudent < ApplicationRecord
  belongs_to :student
  belongs_to :lesson
end
