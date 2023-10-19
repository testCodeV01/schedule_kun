'use client';

import ContainerButton from '@/components/elements/containerButton';
import TimeSpanSelector from '@/components/elements/timeSpanSelector';
import { Dashboard } from '@/components/layouts/dashboard';
import { useTeachersClient } from '@/hooks/ScheduleKunApi/useTeachersClient';
import type { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Card, Form, FormGroup, Modal } from 'react-bootstrap';
import { BsFillTrash3Fill } from 'react-icons/bs';

const EditLesson: NextPage<{ params: any }> = ({ params }) => {
  const router = useRouter();
  const TeachersClient = useTeachersClient();
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
  const [showDelete, setShowDelete] = useState(false);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!params.lessonId) return;

    TeachersClient.get(`/lessons/${params.lessonId}/edit`)
      .then((res) => {
        setBranches(res.data.branches);
        setSubjects(res.data.subjects);
        setLessonRooms(res.data.lesson_rooms);

        setLesson({ name: res.data.lesson.name, description: res.data.lesson.description });
        setBranchId(res.data.lesson.branch_id);
        setLessonRoomId(res.data.lesson.lesson_room_d);
        setSubjectId(res.data.lesson.subject_id);
        setStartTime(new Date(`${res.data.lesson.lesson_date} ${res.data.lesson.start_time}`));
        setEndTime(new Date(`${res.data.lesson.lesson_date} ${res.data.lesson.end_time}`));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = () => {
    if (branchId < 0) return;
    if (lessonRoomId < 0) return;
    if (subjectId < 0) return;

    TeachersClient.put(`/lessons/${params.lessonId}`, {
      lesson: { ...lesson, start_time: startTime, end_time: endTime, branch_id: branchId, lesson_room_id: lessonRoomId, subject_id: subjectId }
    })
      .then(() => router.back())
      .catch((e: any) => {
        setErrors(e.response.data.errors);
        setShow(false);
      });
  };

  const deleteLesson = () => {
    TeachersClient.delete(`/lessons/${params.lessonId}`)
      .then(() => router.back())
      .catch(() => {
        setShowDelete(false);
      });
  };

  const cancel = () => {
    router.back();
  };

  return (
    <>
      <Dashboard.teachers>
        <Card className="p-3 mb-2 shadow-sm color-combo-default" style={{ width: '500px' }}>
          <Form>
            <div className='d-flex'>
              <Card className='p-1 mb-3 shadow-sm' style={{ width: '200px' }}>
                {query.get('year')}年{query.get('month')}月{query.get('day')}日
              </Card>
              <ContainerButton className="ms-auto mb-3" onClick={() => setShowDelete(true)}><BsFillTrash3Fill /></ContainerButton>
            </div>
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
              <Form.Control value={lesson.name} onChange={(e: any) => {
                setLesson({ ...lesson, name: e.target.value });
              }}/>
            </FormGroup>
            <FormGroup className='mb-3'>
              <Form.Label>内容</Form.Label>
              <Form.Control value={lesson.description} as="textarea" rows={10} onChange={(e: any) => {
                setLesson({ ...lesson, description: e.target.value });
              }} />
            </FormGroup>
            <TimeSpanSelector
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              errors={errors}
            />
          </Form>
        </Card>
        <Button className='me-3' onClick={() => setShow(true)}>更新</Button>
        <Button variant="danger" onClick={cancel}>キャンセル</Button>
      </Dashboard.teachers>

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>このレッスン内容の登録を削除しても良いですか？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={deleteLesson}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

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

export default EditLesson;
