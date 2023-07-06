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

        if (res.data.branches.length > 0) {
          setBranchId(res.data.branches[0].id);
          if (res.data.branches[0].lesson_rooms.length > 0) setLessonRoomId(res.data.branches[0].lesson_rooms[0].id);
        }
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
        console.log(e.response.data.errors);
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
              <Form.Select>
                {branches.map((branch: any, branchInd: number) => {
                  return <option key={branchInd} value={branch.id} onChange={(e: any) => setBranchId(e.target.value)}>{branch.name}</option>;
                })}
              </Form.Select>
            </FormGroup>
            <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
              <Form.Label className='d-flex align-items-center mb-0' style={{ width: '50px' }}>教室</Form.Label>
              <Form.Select>
                {branches.map((branch: any) => {
                  return (
                    branch.id === branchId && branch.lesson_rooms.map((lessonRoom: any, lessonRoomInd: number) => {
                      return <option key={lessonRoomInd} value={lessonRoom.id} onChange={(e: any) => setLessonRoomId(e.target.value)}>{lessonRoom.name}</option>;
                    })
                  );
                })}
              </Form.Select>
            </FormGroup>
          </div>
          <FormGroup className='mb-3'>
            <Form.Label>教科</Form.Label>
            <Form.Select>
              {subjects.map((subject: any, subjectInd: number) => {
                return <option key={subjectInd} value={subject.id} onChange={(e: any) => setSubjectId(e.target.value)}>{subject.name}</option>;
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
            <Form.Control isInvalid={!!errors?.between_time} as="textarea" rows={10} onChange={(e: any) => {
              setLesson({ ...lesson, description: e.target.value });
            }} />
            <Form.Control.Feedback type="invalid">{errors?.between_time}</Form.Control.Feedback>
          </FormGroup>
          <div className={`d-flex ${!!errors?.between_time ? 'is-invalid' : ''}`}>
            <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
              <Form.Label className='d-flex align-items-center mb-0' style={{ width: '100px' }}>開始時刻</Form.Label>
              <TimePicker isInvalid={!!errors?.between_time} style={{ width: '150px' }} time={startTime} onChange={setStartTime} />
            </FormGroup>
            <span className='d-flex align-items-center mb-0 me-3'>~</span>
            <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
              <Form.Label className='d-flex align-items-center mb-0' style={{ width: '100px' }}>終了時刻</Form.Label>
              <TimePicker isInvalid={!!errors?.between_time} style={{ width: '150px' }} time={endTime} onChange={setEndTime} />
            </FormGroup>
          </div>
          <Form.Control.Feedback type="invalid">{errors?.between_time}</Form.Control.Feedback>
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
