'use client';

import type { NextPage } from 'next';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { Key, useEffect, useState } from 'react';
import WeekPicker from '@/components/elements/weekpicker';
import { Route } from '@/config/Route';

import styles from './styles.module.css';
import { useTeachersClient } from '@/hooks/ScheduleKunApi/useTeachersClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dashboard } from '@/components/layouts/dashboard';

const WeekSchedule: NextPage = () => {
  const router = useRouter();
  const teachersClient = useTeachersClient();
  const params = useSearchParams();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const [lessonDatas, setLessonDatas] = useState([]);

  const [onset, setOnset] = useState(false);

  useEffect(() => {
    if (!params.get('year')) return;
    if (!params.get('month')) return;
    if (!params.get('day')) return;

    setYear(Number(params.get('year')));
    setMonth(Number(params.get('month')));
    setDay(Number(params.get('day')));

    teachersClient.get(
      '/calendars/week',
      { year: params.get('year'), month: params.get('month'), day: params.get('day') }
    ).then((res) => {
      setLessonDatas(res.data);
    }).then(() => setOnset(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (!onset) return;

    router.push(Route.teachers.calendarWeekPath({ year: year, month: month, day: day }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onset, year, month, day]);

  const changeToMonth = () => {
    router.push(Route.teachers.calendarMonthPath({ year: year, month: month }));
  };

  const toDaySchedule = (selectedDay: number) => {
    router.push(Route.teachers.lessonsPath({ year: year, month: month, day: selectedDay }));
  };

  return (
    <>
      <Dashboard.teachers>
        <div className='d-flex p-2'>
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
          <Button className='ms-auto color-combo-sub' onClick={changeToMonth}>月</Button>
        </div>
        <ListGroup className="shadow">
          <ListGroup.Item className={`pt-0 pb-0 ${styles.weekCalendar}`}>
            <div className="row">
              <div className='col-sm border-end color-combo-option'>月</div>
              <div className='col-sm border-end color-combo-option'>火</div>
              <div className='col-sm border-end color-combo-option'>水</div>
              <div className='col-sm border-end color-combo-option'>木</div>
              <div className='col-sm border-end color-combo-option'>金</div>
              <div className='col-sm border-end color-combo-saturday'>土</div>
              <div className='col-sm color-combo-sunday'>日</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className={`pt-0 pb-0 ${styles.weekCalendar}`}>
            <div className="row">
              {lessonDatas.map((colData: any, colIndex: Key) => {
                return (
                  <div
                    key={colIndex}
                    className={`col-sm ${colData.column < 6 && 'border-end'} ${colData.year === today.getFullYear() && colData.month === today.getMonth()+1 && colData.day === today.getDate() ? 'color-combo-sub' : ((colData.column === 5 && 'color-saturday') || (colData.column === 6 && 'color-sunday'))}`}
                    role='button'
                    onClick={() => toDaySchedule(colData.day)}
                  >
                    <div>{colData.month !== month && `${colData.month}/`}{colData.day}</div>
                    <div className="fs-7">
                      {!colData.lessons && (
                        <div className="mb-2" style={{ height: '300px' }}></div>
                      )}
                      {colData.lessons && colData.lessons.map((lesson: any, lessonIndex: Key) => {
                        return (
                          <Card key={lessonIndex} className="p-1 mb-2 shadow-sm color-combo-default">
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
      </Dashboard.teachers>
    </>
  );
};

export default WeekSchedule;
