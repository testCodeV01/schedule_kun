require "rails_helper"

RSpec.describe Holiday, type: :model do
  describe "#save_begining_of_day" do
    let(:holiday) { create(:holiday, day: Time.zone.now) }

    it "設定した日付の0時で登録されること" do
      expect(holiday.day).to eq Time.zone.now.beginning_of_day
    end
  end
end
