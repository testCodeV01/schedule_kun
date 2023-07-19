FactoryBot.define do
  factory :lesson_room do
    association :branch

    sequence(:name, "レッスン室_1")
  end
end
