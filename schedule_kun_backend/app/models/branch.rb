class Branch < ApplicationRecord
  belongs_to :school
  has_many :lessons, dependent: :destroy
  has_many :lesson_rooms, dependent: :destroy
end
