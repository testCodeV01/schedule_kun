FactoryBot.define do
  factory :branch_teacher do
    association :branch
    association :teacher
  end
end
