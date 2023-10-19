'use client';

import TimePicker from '@/components/elements/timepicker';
import { Dashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import { useTeachersClient } from '@/hooks/ScheduleKunApi/useTeachersClient';
import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Card, Form, FormGroup, Modal } from 'react-bootstrap';

const CreateLesson: NextPage = () => {
  const router = useRouter();
  const teachersClient = useTeachersClient();
  const query = useSearchParams();

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
    if (!query.get('year')) return;
    if (!query.get('month')) return;
    if (!query.get('day')) return;

    teachersClient.get('/lessons/new')
      .then((res) => {
        setBranches(res.data.branches);
        setSubjects(res.data.subjects);
        setLessonRooms(res.data.lesson_rooms);

        if (res.data.branches.length > 0) setBranchId(res.data.branches[0].id);
        if (res.data.lesson_rooms.length > 0) setLessonRoomId(res.data.lesson_rooms[0].id);
        if (res.data.subjects.length > 0) setSubjectId(res.data.subjects[0].id);
      });

    setStartTime(new Date(`${query.get('year')}/${query.get('month')}/${query.get('day')}`));
    setEndTime(new Date(`${query.get('year')}/${query.get('month')}/${query.get('day')}`));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const submit = () => {
    if (branchId < 0) return;
    if (lessonRoomId < 0) return;
    if (subjectId < 0) return;

    teachersClient.post('/lessons', {
      lesson: { ...lesson, start_time: startTime, end_time: endTime, branch_id: branchId, lesson_room_id: lessonRoomId, subject_id: subjectId }
    })
      .then(() => router.push(Route.teachers.lessonsPath({
        year: query.get('year'), month: query.get('month'), day: query.get('day')
      })))
      .catch((e: any) => {
        setErrors(e.response.data.errors);
        setShow(false);
      });
  };

  const cancel = () => {
    router.push(Route.teachers.lessonsPath({
      year: query.get('year'), month: query.get('month'), day: query.get('day')
    }));
  };

  return (
    <>
      <Dashboard.teachers>
        <Card className="p-3 mb-2 shadow-sm color-combo-default" style={{ width: '500px' }}>
          <Form>
            <Card className='p-1 mb-3 shadow-sm' style={{ width: '200px' }}>
              {query.get('year')}年{query.get('month')}月{query.get('day')}日
            </Card>
            <div className='d-flex mb-3'>
              <FormGroup className='d-flex me-3' style={{ width: '200px' }}>
                <Form.Label className='d-flex align-items-center mb-0' style={{ width: '50px' }}>場所</Form.Label>
                <Form.Select onChange={(e: any) => {
                  setBranchId(Number(e.target.value));
                  const lessonRoom: any = lessonRooms.find((lessonRoom: any) => lessonRoom.branch_id === Number(e.target.value));
                  setLessonRoomId(lessonRoom.id);
                }} value={branchId}>
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
          </Form>
        </Card>
        <Button className='me-3' onClick={() => setShow(true)}>登録</Button>
        <Button variant="danger" onClick={cancel}>キャンセル</Button>
      </Dashboard.teachers>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>確認</Modal.Title>
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

export default CreateLesson;
