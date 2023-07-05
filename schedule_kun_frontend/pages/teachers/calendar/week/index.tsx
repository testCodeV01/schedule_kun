import Dashboard from '@/components/layouts/dashboard';
import type { NextPage } from 'next';
import { Card, ListGroup } from 'react-bootstrap';

import { Key, useEffect, useState } from 'react';
import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import { useRouter } from 'next/router';
import WeekPicker from '@/components/elements/weekpicker';
import { Route } from '@/config/Route';

const WeekSchedule: NextPage = () => {
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const [lessonDatas, setLessonDatas] = useState([]);

  const [onset, setOnset] = useState(false);

  useEffect(() => {
    if (!router.query.year) return;
    if (!router.query.month) return;
    if (!router.query.day) return;

    setYear(Number(router.query.year));
    setMonth(Number(router.query.month));
    setDay(Number(router.query.day));

    ScheduleKunApiClient.get(
      '/schedule_kun/teacher/calendars/week',
      { year: router.query.year, month: router.query.month, day: router.query.day }
    ).then((res) => {
      setLessonDatas(res.data);
    }).then(() => setOnset(true));
  }, [router.query.year, router.query.month, router.query.day]);

  useEffect(() => {
    if (!onset) return;

    router.push({
      pathname: Route.teacherCalendarWeekPath,
      query: { year: year, month: month, day: day }
    });
  }, [onset, year, month, day]);

  return (
    <>
      <Dashboard>
        <div style={{ width: '300px' }}>
          <WeekPicker
            year={year}
            month={month}
            day={day}
            setYear={setYear}
            setMonth={setMonth}
            setDay={setDay}
          />
        </div>
        <ListGroup>
          <ListGroup.Item className="pt-0 pb-0">
            <div className="row">
              <div className='col-sm border-end'>月</div>
              <div className='col-sm border-end'>火</div>
              <div className='col-sm border-end'>水</div>
              <div className='col-sm border-end'>木</div>
              <div className='col-sm border-end'>金</div>
              <div className='col-sm border-end'>土</div>
              <div className='col-sm'>日</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="pt-0 pb-0">
            <div className="row">
              {lessonDatas.map((colData: any, colIndex: Key) => {
                return (
                  <div key={colIndex} className={`col-sm ${colData.column < 6 && 'border-end'}`}>
                    <div>{colData.day}</div>
                    <div className="fs-7">
                      {colData.lessons && colData.lessons.map((lesson: any, lessonIndex: Key) => {
                        return (
                          <Card key={lessonIndex} className="p-1 mb-2">
                            <div>{lesson.start_time}~{lesson.end_time}</div>
                            <div>{lesson.name}</div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Dashboard>
    </>
  );
};

export default WeekSchedule;
