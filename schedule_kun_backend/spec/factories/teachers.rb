FactoryBot.define do
  factory :teacher do
    association :school

    sequence(:email) { |n| "teacher_#{n}@example.com" }
    sequence(:password) { SecureRandom.alphanumeric(10) }
    sequence(:name, "先生_1")
  end
end
