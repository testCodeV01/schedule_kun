class Subject < ApplicationRecord
  belongs_to :school
  has_many :lessons

  def client_attributes
    default_client_attributes.except(:school_id)
  end
end
