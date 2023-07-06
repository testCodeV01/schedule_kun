class LessonRoom < ApplicationRecord
  belongs_to :branch
  has_many :lessons, dependent: :destroy
  has_many :events

  def client_attributes
    default_client_attributes.except(:branch_id)
  end
end
