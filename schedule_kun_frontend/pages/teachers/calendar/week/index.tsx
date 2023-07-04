import Dashboard from '@/components/layouts/dashboard';
import type { NextPage } from 'next';
import { Card, ListGroup } from 'react-bootstrap';

import { Key, useEffect, useState } from 'react';
import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import { ChangeViewMode } from '../changeViewMode';

const WeekSchedule: NextPage = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const [lessonDatas, setLessonDatas] = useState([]);

  useEffect(() => {
    if (!year) return;
    if (!month) return;
    if (!day) return;

    ScheduleKunApiClient.get(`/schedule_kun/teacher/calendars/week?year=${year}&month=${month}&day=${day}`).then((res) => {
      setLessonDatas(res.data);
    });
  }, [year, month, day]);

  return (
    <>
      <Dashboard>
        <ChangeViewMode mode="week" />
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
