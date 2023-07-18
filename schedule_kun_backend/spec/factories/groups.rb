FactoryBot.define do
  factory :group do
    association :branch

    sequence(:name, "生徒グループ_1")
  end
end
