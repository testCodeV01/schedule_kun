import Dashboard from '@/components/layouts/dashboard';
import type { NextPage } from 'next';
import { Button, Card, ListGroup } from 'react-bootstrap';

import styles from './styles.module.css';
import { Key, useEffect, useState } from 'react';
import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import { ChangeViewMode } from '../changeViewMode';

const MonthSchedule: NextPage = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [lessonDatas, setLessonDatas] = useState([]);

  useEffect(() => {
    if (!year) return;
    if (!month) return;

    ScheduleKunApiClient.get(`/schedule_kun/teacher/calendars/month?year=${year}&month=${month}`).then((res) => {
      setLessonDatas(res.data);
    });
  }, [year, month]);

  return (
    <>
      <Dashboard>
        <ChangeViewMode mode="month" />
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
                              return lesson.id < 2 ? (
                                <Card key={lessonIndex} className="p-1 mb-2">
                                  <div>{lesson.start_time}~{lesson.end_time}</div>
                                  <div>{lesson.name}</div>
                                </Card>
                              ) : <></>;
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
