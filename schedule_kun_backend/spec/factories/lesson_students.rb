FactoryBot.define do
  factory :lesson_student do
    association :lesson
    association :student
  end
end
