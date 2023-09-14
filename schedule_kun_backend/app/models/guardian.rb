class Guardian < ApplicationRecord
  has_secure_password

  has_many :student_guardians, dependent: :destroy
  has_many :students, through: :student_guardians

  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  def client_attributes
    default_client_attributes.except(:password_digest, :remember_digest)
  end
end
