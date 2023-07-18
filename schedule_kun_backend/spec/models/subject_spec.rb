require 'rails_helper'

RSpec.describe Subject, type: :model do
  let(:f_subject) { create(:subject) }

  describe "#client_attributes" do
    subject { f_subject.client_attributes }

    it "所定のアトリビュートが取得できること" do
      expect(subject.keys).to match_array %i(id description name school_id)
    end
  end
end
