FactoryBot.define do
  factory :guardian do
    sequence(:email) { |n| "guardian_#{n}@example.com" }
    sequence(:password) { SecureRandom.alphanumeric(10) }
    sequence(:name, "保護者_1")
  end
end
