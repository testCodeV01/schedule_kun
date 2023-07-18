FactoryBot.define do
  factory :student_group do
    association :student
    association :group
  end
end
