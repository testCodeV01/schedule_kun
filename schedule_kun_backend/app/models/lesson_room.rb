class LessonRoom < ApplicationRecord
  belongs_to :branch
  has_many :lessons, dependent: :destroy
  has_many :events
end
