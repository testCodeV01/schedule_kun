RSpec.shared_context "teacher_auth_mock" do |target_controller|
  let!(:teacher) { create(:teacher) }

  before do
    allow_any_instance_of(target_controller).to receive(:authenticate!).and_return(true)
    allow_any_instance_of(target_controller).to receive(:verify_authenticity_token).and_return(true)
    allow_any_instance_of(target_controller).to receive(:set_csrf_token_header).and_return(true)
    allow_any_instance_of(target_controller).to receive(:current_teacher).and_return(teacher)
  end
end
