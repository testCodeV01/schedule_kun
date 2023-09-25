class Teacher < ApplicationRecord
  include Breath::Model
  include SoftDeleter

  belongs_to :school

  has_many :lessons, dependent: :destroy
  has_many :events
  has_many :branch_teachers, dependent: :destroy
  has_many :branches, through: :branch_teachers

  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  attr_breath :email

  def client_attributes
    default_client_attributes.except(:password_digest, :remember_digest)
  end
end
