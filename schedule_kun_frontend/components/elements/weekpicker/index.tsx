import { useEffect, useState } from 'react';
import ArrowButton from '../arrowButton';

import styles from './styles.module.css';

const WeekPicker = ({
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
  disable,
}: {
  year: number;
  month: number;
  day: number;
  // eslint-disable-next-line no-unused-vars
  setYear: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  setMonth: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  setDay: (value: number) => void;
  disable?: boolean;
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const newDate = new Date(`${year}/${month}/${day}`);
    setDate(newDate);
  }, [year, month, day]);

  const prevClick = () => {
    date.setDate(date.getDate() - 7);

    setDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    setDay(date.getDate());
  };

  const nextClick = () => {
    date.setDate(date.getDate() + 7);

    setDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    setDay(date.getDate());
  };

  return (
    <>
      <div className="row flatpickr-months w-100">
        <ArrowButton direction='left' className="col-2" onClick={prevClick} disabled={disable} />
        <div className="flatpickr-month col-8 overflow-auto">
          <div className="flatpickr-current-month">
            <span className={styles.label}>今週（{`${year}年${month}月`}）</span>
          </div>
        </div>
        <ArrowButton direction='right' className='col-2' onClick={nextClick} disabled={disable} />
      </div>
    </>
  );
};

export default WeekPicker;
