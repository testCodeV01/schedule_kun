'use client';

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Route } from '@/config/Route';
import ContainerButton from '@/components/elements/containerButton';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useTeachersClient } from '@/hooks/ScheduleKunApi/useTeachersClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dashboard } from '@/components/layouts/dashboard';

const DaySchedule: NextPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const TeachersClient = useTeachersClient();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [onset, setOnset] = useState(false);

  const [lessonDatas, setLessonDatas] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);

  useEffect(() => {
    if (!params.get('year')) return;
    if (!params.get('month')) return;
    if (!params.get('day')) return;

    setYear(Number(params.get('year')));
    setMonth(Number(params.get('month')));
    setDay(Number(params.get('day')));

    setOnset(true);
  }, [params]);

  useEffect(() => {
    if (!onset) return;
    if (deleteId > 0) return;

    TeachersClient.get(
      '/lessons',
      { year: year, month: month, day: day }
    ).then((res) => {
      setLessonDatas(res.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day, onset, deleteId]);

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
      <Dashboard.teachers>
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
                <Button onClick={() => router.push(Route.teachers.editLessonPath(lessonData.id))}>編集</Button>
              </div>
            </Card>
          );
        })}
        <Button className='me-3' onClick={() => router.push(Route.teachers.createLessonPath({
          year: params.get('year'), month: params.get('month'), day: params.get('day')
        }))}>追加</Button>
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
    </>
  );
};

export default DaySchedule;
