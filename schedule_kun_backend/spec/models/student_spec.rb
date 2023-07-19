require "rails_helper"

RSpec.describe Student, type: :model do
  let(:student) { create(:student) }

  describe "validations" do
    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_presence_of :password }
    it { is_expected.to validate_presence_of :name }
  end

  describe "#client_attributes" do
    subject { student.client_attributes }

    it "所定のアトリビュートが取得できること" do
      expect(subject.keys).to match_array [:id, :email, :name, :password]
    end
  end
end
