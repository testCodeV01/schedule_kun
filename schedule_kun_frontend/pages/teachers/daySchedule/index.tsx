import Dashboard from '@/components/layouts/dashboard';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import AddScheduleArea from './addScheduleArea';
import { Route } from '@/config/Route';
import ContainerButton from '@/components/elements/containerButton';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { TeachersClient } from '@/lib/ScheduleKunApi/TeachersClient';

const DaySchedule: NextPage = () => {
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [onset, setOnset] = useState(false);

  const [lessonDatas, setLessonDatas] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);

  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    if (!router.query.year) return;
    if (!router.query.month) return;
    if (!router.query.day) return;

    setYear(Number(router.query.year));
    setMonth(Number(router.query.month));
    setDay(Number(router.query.day));

    setOnset(true);
  }, [router.query.year, router.query.month, router.query.day]);

  useEffect(() => {
    if (!onset) return;
    if (addMode) return;
    if (deleteId > 0) return;

    TeachersClient.get(
      '/lessons',
      { year: year, month: month, day: day }
    ).then((res) => {
      setLessonDatas(res.data);
    });
  }, [year, month, day, onset, addMode, deleteId]);

  const deleteLesson = () => {
    if (deleteId < 0) return;

    TeachersClient.delete(`/lessons/${deleteId}`)
      .then(() => {
        setShowDelete(false);
        setDeleteId(-1);
      })
      .catch(() => {
        setShowDelete(false);
      });
  };

  return (
    <>
      <Dashboard>
        {addMode && (
          <AddScheduleArea endAddMode={() => setAddMode(false)} />
        )}
        {!addMode && (
          <>
            {lessonDatas.map((lessonData: any, lessonIndex: number) => {
              return (
                <Card key={lessonIndex} className="p-1 mb-2 color-combo-default shadow-sm d-flex flex-row">
                  <div>
                    <div>{lessonData.start_time}~{lessonData.end_time}</div>
                    <div>教科：{lessonData.subject?.name} {lessonData.name}</div>
                    <div>{lessonData.description}</div>
                    <div>教室：{lessonData.branch?.name}校 {lessonData.lesson_room?.name}</div>
                  </div>
                  <div className="ms-auto d-flex align-items-center me-3">
                    <ContainerButton className="ms-auto mb-3" onClick={() => {
                      setDeleteId(lessonData.id);
                      setShowDelete(true);
                    }}
                    >
                      <BsFillTrash3Fill />
                    </ContainerButton>
                    <Button onClick={() => router.push(Route.editLessonPath(lessonData.id))}>編集</Button>
                  </div>
                </Card>
              );
            })}
            <Button className='me-3' onClick={() => setAddMode(true)}>追加</Button>
          </>
        )}
      </Dashboard>

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
    </>
  );
};

export default DaySchedule;
