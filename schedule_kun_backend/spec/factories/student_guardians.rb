FactoryBot.define do
  factory :student_guardian do
    association :student
    association :guardian
  end
end
