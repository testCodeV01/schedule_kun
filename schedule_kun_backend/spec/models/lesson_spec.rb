require "rails_helper"

RSpec.describe Lesson, type: :model do
  let(:time) { Time.parse("#{Time.zone.now.strftime("%Y/%m/%d")} 16:00:00") }
  let(:lesson) { create(:lesson) }

  describe "validations" do
    it { is_expected.to validate_presence_of :start_time }
    it { is_expected.to validate_presence_of :end_time }

    context "開始時間より終了時間のほうが若い時" do
      before do
        lesson.start_time = time
        lesson.end_time = time - 1.hour
      end

      it "バリデーションエラーとなること" do
        expect(lesson).to be_invalid
      end
    end

    context "開始時間より終了時間が古い時" do
      before do
        lesson.start_time = time
        lesson.end_time = time + 1.hour
      end

      it "バリデーションエラーとならないこと" do
        expect(lesson).to be_valid
      end
    end

    context "開始時間と終了時間が異なる日の時" do
      before do
        lesson.start_time = time
        lesson.end_time = time + 1.day
      end

      it "バリデーションエラーとなること" do
        expect(lesson).to be_invalid
      end
    end

    context "既に登録済みのレッスンがある時" do
      let(:time) { Time.parse("#{Time.zone.now.strftime("%Y/%m/%d")} 16:00:00") }
      let(:teacher) { lesson.teacher }
      let!(:lesson1) { create(:lesson, start_time: time - 1.hour, end_time: time, teacher: teacher) }
      let!(:lesson2) { create(:lesson, start_time: time + 1.hour, end_time: time + 2.hour, teacher: teacher) }

      context "開始時間が既に登録済みレッスンの終了時間より前の場合" do
        before do
          lesson.start_time = time - 5.minutes
          lesson.end_time = time + 30.minutes
        end

        it "エラーとなること" do
          expect(lesson).to be_invalid
        end
      end

      context "開始時間が既に登録済みレッスンの終了時間と同じ場合" do
        before do
          lesson.start_time = time
          lesson.end_time = time + 30.minutes
        end

        it "エラーとならないこと" do
          expect(lesson).to be_valid
        end
      end

      context "終了時間が既に登録済みレッスンの開始時間と同じ場合" do
        before do
          lesson.start_time = time + 30.minutes
          lesson.end_time = time + 1.hour
        end

        it "エラーとならないこと" do
          expect(lesson).to be_valid
        end
      end

      context "終了時間が既に登録済みレッスンの開始時間より後の場合" do
        before do
          lesson.start_time = time + 30.minutes
          lesson.end_time = time + 1.hour + 5.minutes
        end

        it "エラーとなること" do
          expect(lesson).to be_invalid
        end
      end

      context "違う先生のレッスンと時間がかぶる場合" do
        let(:teacher2) { create(:teacher) }

        before do
          lesson2.teacher = teacher2
          lesson2.save

          lesson.start_time = time + 30.minutes
          lesson.end_time = time + 1.hour + 5.minutes
        end

        it "エラーとならないこと" do
          expect(lesson).to be_valid
        end
      end
    end
  end

  describe "#client_attributes" do
    subject { lesson.client_attributes }

    it "所定のアトリビュートが取得できること" do
      expect(subject.keys).to match_array %i[id teacher_id lesson_room_id branch_id name description start_time end_time lesson_date subject_id]
    end
  end

  describe "#when" do
    subject { Lesson.when(Time.zone.now) }

    it "開始時間が今日のレッスンのみ取得できること" do
      expect(subject.map { |lesson| lesson.start_time.strftime("%Y/%m/%d") }.uniq).to eq([Time.zone.now.strftime("%Y/%m/%d")]).or eq([])
    end

    it "終了時間が今日のレッスンのみ取得できること" do
      expect(subject.map { |lesson| lesson.end_time.strftime("%Y/%m/%d") }.uniq).to eq([Time.zone.now.strftime("%Y/%m/%d")]).or eq([])
    end
  end

  describe "#overlap_time" do
    let(:time) { Time.parse("#{Time.zone.now.strftime("%Y/%m/%d")} 16:00:00") }
    let(:teacher) { lesson.teacher }
    let!(:lesson1) { create(:lesson, start_time: time - 1.hour, end_time: time) }
    let!(:lesson2) { create(:lesson, start_time: time + 1.hour, end_time: time + 2.hour) }

    context "第一引数と第二引数の時間の間に終了時間があるレッスンがある場合" do
      subject { Lesson.overlap_time(time - 5.minutes, time + 30.minutes) }

      it "該当のレッスンが取得できること" do
        expect(subject.map(&:id)).to eq [lesson1.id]
      end
    end

    context "第一引数の時間と等しい終了時間のレッスンがある場合" do
      subject { Lesson.overlap_time(time, time + 30.minutes) }

      it "取得されないこと" do
        expect(subject.map(&:id).blank?).to be_truthy
      end
    end

    context "第二引数の時間と等しい開始時間のレッスンがある場合" do
      subject { Lesson.overlap_time(time + 30.minutes, time + 1.hour) }

      it "取得されないこと" do
        expect(subject.map(&:id).blank?).to be_truthy
      end
    end

    context "第二引数の時間より前に開始時間のあるレッスンがある場合" do
      subject { Lesson.overlap_time(time + 30.minutes, time + 1.hour + 5.minutes) }

      it "該当のレッスンが取得できること" do
        expect(subject.map(&:id)).to eq [lesson2.id]
      end
    end

    context "第一引数の時間より前に開始時間があり、第二引数の時間より後に終了時間のあるレッスンがある場合" do
      subject { Lesson.overlap_time(time - 30.minutes, time - 5.minutes) }

      it "該当のレッスンが取得できること" do
        expect(subject.map(&:id)).to eq [lesson1.id]
      end
    end

    context "第一引数の時間より後に開始時間があり、第二引数より前に終了時間のあるレッスンがある場合" do
      subject { Lesson.overlap_time(time - 1.hour - 5.minutes, time + 5.minutes) }

      it "該当のレッスンが取得できること" do
        expect(subject.map(&:id)).to eq [lesson1.id]
      end
    end
  end
end
