class Absence < ApplicationRecord
  include SoftDeleter

  belongs_to :student
  belongs_to :lesson
end
