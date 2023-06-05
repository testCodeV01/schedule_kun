class Guardian < ApplicationRecord
  has_many :student_guardians, dependent: :destroy
  has_many :students, through: :student_guardians
  accepts_nested_attributes_for :student_guardians

  def client_attributes
    default_client_attributes
  end
end
