require "rails_helper"

RSpec.describe Teacher, type: :model do
  let(:teacher) { create(:teacher) }

  describe "validations" do
    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_presence_of :password }
    it { is_expected.to validate_presence_of :name }
  end

  describe "#client_attributes" do
    subject { teacher.client_attributes }

    it "所定のアトリビュートが取得できること" do
      expect(subject.keys).to match_array [:id, :email, :name, :school_id]
    end
  end
end
