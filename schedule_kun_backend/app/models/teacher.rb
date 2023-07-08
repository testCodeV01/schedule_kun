class Teacher < ApplicationRecord
  belongs_to :school

  has_many :lessons, dependent: :destroy
  has_many :events
  has_many :branch_teachers, dependent: :destroy
  has_many :branches, through: :branch_teachers

  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  def client_attributes
    default_client_attributes
  end
end
