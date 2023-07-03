class Student < ApplicationRecord
  has_many :student_guardians, dependent: :destroy
  has_many :guardians, through: :student_guardians
  has_many :absences, dependent: :destroy
  has_many :student_groups, dependent: :destroy
  has_many :groups, through: :student_groups
  has_many :lesson_students, dependent: :destroy
  has_many :lessons, through: :lesson_students

  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  def client_attributes
    default_client_attributes
  end
end
