require "rails_helper"

RSpec.describe Branch, type: :model do
  let(:branch) { create(:branch) }

  describe "#client_attributes" do
    subject { branch.client_attributes }

    it "所定のアトリビュートが取得できること" do
      expect(subject.keys).to match_array [:id, :school_id, :name, :zip_code, :address, :phone_number]
    end
  end
end
