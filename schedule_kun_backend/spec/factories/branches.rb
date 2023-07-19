FactoryBot.define do
  factory :branch do
    association :school

    sequence(:name, "教室_1")
  end
end
