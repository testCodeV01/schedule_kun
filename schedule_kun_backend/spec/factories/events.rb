FactoryBot.define do
  factory :event do
    association :lesson_room
    association :teacher

    sequence(:name, "イベント_1")
  end
end
