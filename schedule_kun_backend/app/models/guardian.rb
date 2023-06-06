class Guardian < ApplicationRecord
  has_many :student_guardians, dependent: :destroy
  has_many :students, through: :student_guardians
  accepts_nested_attributes_for :student_guardians

  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  def client_attributes
    default_client_attributes
  end
end
