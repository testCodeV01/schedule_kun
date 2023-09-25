class LessonRoom < ApplicationRecord
  include SoftDeleter

  belongs_to :branch
  has_many :lessons, dependent: :destroy
  has_many :events

  def client_attributes
    default_client_attributes
  end
end
