import { Form, FormGroup } from 'react-bootstrap';
import TimePicker from '../timepicker';

const TimeSpanSelector = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  errors = {},
}: {
  startTime: Date,
  endTime: Date,
  // eslint-disable-next-line no-unused-vars
  setStartTime: (e: any) => void,
  // eslint-disable-next-line no-unused-vars
  setEndTime: (e: any) => void,
  errors: any,
}) => {
  return (
    <>
      <div className={`d-flex ${!!errors?.start_time ? 'is-invalid' : ''}`}>
        <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
          <Form.Label className='d-flex align-items-center mb-0' style={{ width: '100px' }}>開始時刻</Form.Label>
          <TimePicker isInvalid={!!errors?.start_time} style={{ width: '150px' }} time={startTime} onChange={setStartTime} />
        </FormGroup>
        <span className='d-flex align-items-center mb-0 me-3'>~</span>
        <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
          <Form.Label className='d-flex align-items-center mb-0' style={{ width: '100px' }}>終了時刻</Form.Label>
          <TimePicker isInvalid={!!errors?.start_time} style={{ width: '150px' }} time={endTime} onChange={setEndTime} />
        </FormGroup>
      </div>
      <Form.Control.Feedback type="invalid">{errors?.start_time}</Form.Control.Feedback>
    </>
  );
};

export default TimeSpanSelector;
