'use client';

import type { NextPage } from 'next';
import { Card, ListGroup } from 'react-bootstrap';
import { Key, useEffect, useState } from 'react';
import { MonthPicker } from '@/components/elements/monthpicker';
import { Route } from '@/config/Route';
import ArrowButton from '@/components/elements/arrowButton';

import styles from './styles.module.css';
import { useTeachersClient } from '@/hooks/ScheduleKunApi/useTeachersClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dashboard } from '@/components/layouts/dashboard';

const MonthSchedule: NextPage = () => {
  const teachersClient = useTeachersClient();
  const query = useSearchParams();

  const [loading, setLoading] = useState<boolean|undefined>(false);
  const [lessonDatas, setLessonDatas] = useState([]);
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [onset, setOnset] = useState(false);

  useEffect(() => {
    setYear(Number(query.get('year')));
    setMonth(Number(query.get('month')));

    setLoading(true);

    teachersClient.get('/calendars/month',
      { year: query.get('year'), month: query.get('month') }
    )
      .then((res) => {
        setLessonDatas(res.data);
        setOnset(true);
      }).then(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!onset) return;

    router.push(Route.teachers.calendarMonthPath({ year: year, month: month }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onset, year, month]);

  const changeToWeek = (vMonth: number, day: number) => {
    router.push(Route.teachers.calendarWeekPath({ year: year, month: vMonth, day: day }));
  };

  const toDaySchedule = (day: number) => {
    router.push(Route.teachers.lessonsPath({ year: year, month: month, day: day }));
  };

  return (
    <>
      <Dashboard.teachers>
        {/* <DatePicker date={date} onChange={setDate} /> */}
        <div className="p-2" style={{ width: '300px' }}>
          <MonthPicker
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            disable={loading}
          />
        </div>
        <ListGroup className="shadow">
          <ListGroup.Item className={`pt-0 pb-0 ${styles.monthArea}`}>
            <div className="row">
              <div className='border-end' style={{ width: '50px' }}></div>
              <div className='col-sm border-end color-combo-option'>月</div>
              <div className='col-sm border-end color-combo-option'>火</div>
              <div className='col-sm border-end color-combo-option'>水</div>
              <div className='col-sm border-end color-combo-option'>木</div>
              <div className='col-sm border-end color-combo-option'>金</div>
              <div className='col-sm border-end color-combo-saturday'>土</div>
              <div className='col-sm color-combo-sunday'>日</div>
            </div>
          </ListGroup.Item>
          {lessonDatas.map((rowData: any, rowIndex: Key) => {
            return (
              <ListGroup.Item className={`pt-0 pb-0 ${styles.monthArea}`} key={rowIndex}>
                <div className="row">
                  <div className='p-0 border-end color-combo-sub' style={{ width: '50px' }}>
                    <ArrowButton direction='right' className='h-100 w-100 p-0' onClick={() => changeToWeek(rowData[0].month, rowData[0].day)} arrowColor="var(--color-font-sub)" />
                  </div>
                  {rowData.map((columnData: any, colIndex: Key) => {
                    return (
                      <div className={
                        `col-sm
                        ${columnData.column < 6 && 'border-end'}
                        ${columnData.month !== month ? 'color-combo-disabled' : ((columnData.year === today.getFullYear() && columnData.month === today.getMonth()+1 && columnData.day === today.getDate() ? 'color-combo-sub' : (columnData.column === 6 && 'color-sunday') || (columnData.column === 5 && 'color-saturday')))}
                      `} key={colIndex} role='button' onClick={() => toDaySchedule(columnData.day)}>
                        <div>{columnData.day}</div>
                        <div className="fs-7">
                          {columnData.lessons_count === 0 && (
                            <div className="mb-2" style={{ height: '50px' }}></div>
                          )}
                          {columnData.lessons && (
                            columnData.lessons.map((lesson: any, lessonIndex: Key) => {
                              return lesson.id < 2 && (
                                <Card key={lessonIndex} className="p-1 mb-2 color-combo-default shadow-sm">
                                  <div>{lesson.start_time}~{lesson.end_time}</div>
                                  <div>{lesson.name}</div>
                                </Card>
                              );
                            })
                          )}
                          {columnData.lessons_count > 2 && (
                            <div className="mb-2">
                              <span>他{columnData.lessons_count - 2}件</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Dashboard.teachers>
    </>
  );
};

export default MonthSchedule;
