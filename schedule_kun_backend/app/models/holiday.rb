class Holiday < ApplicationRecord
  include SoftDeleter

  belongs_to :school

  validates :day, presence: true, uniqueness: { scope: :school_id }

  before_save :save_begining_of_day

  private

    def save_begining_of_day
      self.day = day.beginning_of_day

      true
    end
end
