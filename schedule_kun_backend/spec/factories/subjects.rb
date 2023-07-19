FactoryBot.define do
  factory :subject do
    association :school

    sequence(:name, "教科_1")
  end
end
