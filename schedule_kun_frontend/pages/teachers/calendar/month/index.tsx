import Dashboard from '@/components/layouts/dashboard';
import type { NextPage } from 'next';
import { Card, ListGroup } from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import { ChangeViewMode } from '../ChangeViewMode';
import { MonthPicker } from '@/components/elements/monthpicker';
import { CookieKeys } from '@/config/CookieKeys';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Route } from '@/config/Route';

const MonthSchedule: NextPage = () => {
  const [loading, setLoading] = useState<boolean|undefined>(false);
  const [lessonDatas, setLessonDatas] = useState([]);
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [onset, setOnset] = useState(false);

  useEffect(() => {
    if (!router.query.year) return;
    if (!router.query.month) return;

    setYear(Number(router.query.year));
    setMonth(Number(router.query.month));

    setLoading(true);

    ScheduleKunApiClient.get('/schedule_kun/teacher/calendars/month',
      { year: router.query.year, month: router.query.month }
    )
      .then((res) => {
        setLessonDatas(res.data);
        setOnset(true);
      }).then(() => {
        setLoading(false);
      });
  }, [router.query.year, router.query.month]);

  useEffect(() => {
    if (!onset) return;

    router.push({ pathname: Route.teacherCalendarMonthPath, query: { year: year, month: month } });
  }, [onset, year, month]);

  return (
    <>
      <Dashboard>
        <ChangeViewMode mode="month" />
        {/* <DatePicker date={date} onChange={setDate} /> */}
        <div style={{ width: '300px' }}>
          <MonthPicker
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            disable={loading}
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
          {lessonDatas.map((rowData: any, rowIndex: Key) => {
            return (
              <ListGroup.Item className="pt-0 pb-0" key={rowIndex}>
                <div className="row">
                  {rowData.map((columnData: any, colIndex: Key) => {
                    return (
                      <div className={`col-sm ${columnData.column < 6 && 'border-end'}`} key={colIndex}>
                        <div>{columnData.day}</div>
                        <div className="fs-7">
                          {columnData.lessons_count === 0 && (
                            <div className="mb-2" style={{ height: '50px' }}></div>
                          )}
                          {columnData.lessons && (
                            columnData.lessons.map((lesson: any, lessonIndex: Key) => {
                              return lesson.id < 2 && (
                                <Card key={lessonIndex} className="p-1 mb-2">
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
      </Dashboard>
    </>
  );
};

export default MonthSchedule;
