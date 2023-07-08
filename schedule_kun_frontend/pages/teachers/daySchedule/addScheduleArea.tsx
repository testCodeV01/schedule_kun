import TimePicker from '@/components/elements/timepicker';
import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Form, FormGroup, Modal } from 'react-bootstrap';

const AddScheduleArea = ({
  endAddMode,
}: {
  endAddMode: () => void;
}) => {
  const router = useRouter();
  const [lesson, setLesson] = useState({
    name: '',
    description: '',
  });
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [branchId, setBranchId] = useState(-1);
  const [lessonRoomId, setLessonRoomId] = useState(-1);
  const [subjectId, setSubjectId] = useState(-1);

  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessonRooms, setLessonRooms] = useState([]);

  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!router.query.year) return;
    if (!router.query.month) return;
    if (!router.query.day) return;

    ScheduleKunApiClient.get('/schedule_kun/teacher/lessons/new')
      .then((res) => {
        setBranches(res.data.branches);
        setSubjects(res.data.subjects);
        setLessonRooms(res.data.lesson_rooms);

        if (res.data.branches.length > 0) setBranchId(res.data.branches[0].id);
        if (res.data.lesson_rooms.length > 0) setLessonRoomId(res.data.lesson_rooms[0].id);
        if (res.data.subjects.length > 0) setSubjectId(res.data.subjects[0].id);
      });

    setStartTime(new Date(`${router.query.year}/${router.query.month}/${router.query.day}`));
    setEndTime(new Date(`${router.query.year}/${router.query.month}/${router.query.day}`));
  }, [router.query.year, router.query.month, router.query.day]);

  const submit = () => {
    if (branchId < 0) return;
    if (lessonRoomId < 0) return;
    if (subjectId < 0) return;

    ScheduleKunApiClient.post('/schedule_kun/teacher/lessons', {
      lesson: { ...lesson, start_time: startTime, end_time: endTime, branch_id: branchId, lesson_room_id: lessonRoomId, subject_id: subjectId }
    })
      .then(() => endAddMode())
      .catch((e: any) => {
        setErrors(e.response.data.errors);
        setShow(false);
      });
  };

  const cancel = () => {
    endAddMode();
  };

  return (
    <>
      <Card className="p-3 mb-2 shadow-sm color-combo-default" style={{ width: '500px' }}>
        <Form>
          <Card className='p-1 mb-3 shadow-sm' style={{ width: '200px' }}>
            {router.query.year}年{router.query.month}月{router.query.day}日
          </Card>
          <div className='d-flex mb-3'>
            <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
              <Form.Label className='d-flex align-items-center mb-0' style={{ width: '50px' }}>場所</Form.Label>
              <Form.Select onChange={(e: any) => setBranchId(Number(e.target.value))} value={branchId}>
                {branches.map((branch: any, branchInd: number) => {
                  return <option key={branchInd} value={branch.id}>{branch.name}</option>;
                })}
              </Form.Select>
            </FormGroup>
            <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
              <Form.Label className='d-flex align-items-center mb-0' style={{ width: '50px' }}>教室</Form.Label>
              <Form.Select onChange={(e: any) => setLessonRoomId(Number(e.target.value))} value={lessonRoomId}>
                {lessonRooms.map((lessonRoom: any, lessonRoomInd: number) => {
                  return lessonRoom.branch_id === branchId && <option key={lessonRoomInd} value={lessonRoom.id}>{lessonRoom.name}</option>;
                })}
              </Form.Select>
            </FormGroup>
          </div>
          <FormGroup className='mb-3'>
            <Form.Label>教科</Form.Label>
            <Form.Select onChange={(e: any) => setSubjectId(Number(e.target.value))} value={subjectId}>
              {subjects.map((subject: any, subjectInd: number) => {
                return <option key={subjectInd} value={subject.id}>{subject.name}</option>;
              })}
            </Form.Select>
          </FormGroup>
          <FormGroup className='mb-3'>
            <Form.Label>レッスン名</Form.Label>
            <Form.Control onChange={(e: any) => {
              setLesson({ ...lesson, name: e.target.value });
            }}/>
          </FormGroup>
          <FormGroup className='mb-3'>
            <Form.Label>内容</Form.Label>
            <Form.Control as="textarea" rows={10} onChange={(e: any) => {
              setLesson({ ...lesson, description: e.target.value });
            }} />
          </FormGroup>
          <div className={`d-flex ${!!errors?.both_time ? 'is-invalid' : ''}`}>
            <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
              <Form.Label className='d-flex align-items-center mb-0' style={{ width: '100px' }}>開始時刻</Form.Label>
              <TimePicker isInvalid={!!errors?.both_time} style={{ width: '150px' }} time={startTime} onChange={setStartTime} />
            </FormGroup>
            <span className='d-flex align-items-center mb-0 me-3'>~</span>
            <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
              <Form.Label className='d-flex align-items-center mb-0' style={{ width: '100px' }}>終了時刻</Form.Label>
              <TimePicker isInvalid={!!errors?.both_time} style={{ width: '150px' }} time={endTime} onChange={setEndTime} />
            </FormGroup>
          </div>
          <Form.Control.Feedback type="invalid">{errors?.both_time}</Form.Control.Feedback>
        </Form>
      </Card>
      <Button className='me-3' onClick={() => setShow(true)}>登録</Button>
      <Button variant="danger" onClick={cancel}>キャンセル</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>この内容で登録しても良いですか？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={submit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddScheduleArea;
