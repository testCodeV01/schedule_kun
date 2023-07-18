FactoryBot.define do
  factory :lesson do
    association :teacher
    association :lesson_room
    association :branch
    association :subject

    sequence(:name, "レッスン_1")
  end
end
