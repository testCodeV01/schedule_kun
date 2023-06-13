class Student < ApplicationRecord
  has_many :student_guardians, dependent: :destroy
  has_many :guardians, through: :student_guardians
  has_many :absences, dependent: :destroy
  accepts_nested_attributes_for :student_guardians

  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  def client_attributes
    default_client_attributes
  end
end
