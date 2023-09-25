class Subject < ApplicationRecord
  include SoftDeleter

  belongs_to :school
  has_many :lessons

  def client_attributes
    default_client_attributes
  end
end
