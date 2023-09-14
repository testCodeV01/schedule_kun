FactoryBot.define do
  factory :teacher do
    association :school
    password { "Password01" }

    sequence(:email) { |n| "teacher_#{n}@example.com" }
    sequence(:name, "先生_1")
  end
end
