class School < ApplicationRecord
  has_many :branches, dependent: :destroy
  has_many :holidays, dependent: :destroy
end
