import Dashboard from '@/components/layouts/dashboard';
import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import type { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import AddScheduleArea from './addScheduleArea';
import { Route } from '@/config/Route';

const DaySchedule: NextPage = () => {
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [onset, setOnset] = useState(false);

  const [lessonDatas, setLessonDatas] = useState([]);

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

    ScheduleKunApiClient.get(
      '/schedule_kun/teacher/lessons',
      { year: year, month: month, day: day }
    ).then((res) => {
      setLessonDatas(res.data);
    });
  }, [year, month, day, onset, addMode]);

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
                    <Button onClick={() => router.push(Route.editLessonPath(lessonData.id))}>編集</Button>
                  </div>
                </Card>
              );
            })}
            <Button className='me-3' onClick={() => setAddMode(true)}>追加</Button>
          </>
        )}
      </Dashboard>
    </>
  );
};

export default DaySchedule;
