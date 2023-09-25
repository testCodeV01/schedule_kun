class Group < ApplicationRecord
  include SoftDeleter

  belongs_to :branch
  has_many :student_groups, dependent: :destroy
  has_many :students, through: :student_groups
end
