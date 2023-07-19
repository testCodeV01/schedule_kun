FactoryBot.define do
  factory :student do
    sequence(:email) { |n| "student_#{n}@example.com" }
    sequence(:password) { SecureRandom.alphanumeric(10) }
    sequence(:name, "生徒_1")
  end
end
