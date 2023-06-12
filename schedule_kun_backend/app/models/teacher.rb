class Teacher < ApplicationRecord
  has_many :lessons, dependent: :destroy

  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  def client_attributes
    default_client_attributes
  end
end
