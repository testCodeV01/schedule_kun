class School < ApplicationRecord
  include SoftDeleter

  has_many :branches, dependent: :destroy
  has_many :holidays, dependent: :destroy
  has_many :teachers, dependent: :destroy
  has_many :subjects, dependent: :destroy
end
