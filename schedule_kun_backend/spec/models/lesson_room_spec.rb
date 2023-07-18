require "rails_helper"

RSpec.describe LessonRoom, type: :model do
  let(:lesson_room) { create(:lesson_room) }

  describe "#client_attributes" do
    subject { lesson_room.client_attributes }

    it "所定のアトリビュートが取得できること" do
      expect(subject.keys).to match_array %i(id branch_id name)
    end
  end
end
