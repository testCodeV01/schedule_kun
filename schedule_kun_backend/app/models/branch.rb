class Branch < ApplicationRecord
  include SoftDeleter

  belongs_to :school
  has_many :lessons, dependent: :destroy
  has_many :lesson_rooms, dependent: :destroy
  has_many :groups
  has_many :branch_teachers, dependent: :destroy
  has_many :teachers, through: :branch_teachers

  def client_attributes
    default_client_attributes
  end
end
