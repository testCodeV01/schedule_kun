import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Button } from 'react-bootstrap';
import ArrowButton from '../arrowButton';

export const MonthPicker = ({
  year,
  month,
  setYear,
  setMonth,
  disable,
}: {
  year: number;
  month: number,
  setYear: (value: number) => void;
  setMonth: (value: number) => void;
  disable?: boolean;
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const newDate = new Date(`${year}/${month}/1`);
    setDate(newDate);
  }, [year, month]);

  const prevClick = () => {
    date.setMonth(date.getMonth() - 1);

    setDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const nextClick = () => {
    date.setMonth(date.getMonth() + 1);

    setDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const changeYear = (value: number) => {
    date.setFullYear(value);

    setDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const yearUp = () => {
    date.setFullYear(date.getFullYear() + 1);

    setDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const yearDown = () => {
    date.setFullYear(date.getFullYear() - 1);

    setDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  return (
    <>
      <div className="row flatpickr-months w-100">
        <ArrowButton direction='left' className="col-2" onClick={prevClick} disabled={disable} />
        <div className="flatpickr-month col-8 overflow-auto">
          <div className="flatpickr-current-month">
            <span className="cur-month">{month}月 </span>
            <div className="numInputWrapper">
              <input
                className={`numInput cur-year ${styles.numInput}`}
                type="number"
                value={`${year}`}
                onChange={(e: any) => changeYear(e.target.value)}
                disabled={disable}
              />
              <span className="arrowUp" onClick={yearUp}></span>
              <span className="arrowDown" onClick={yearDown}></span>
            </div>
          </div>
        </div>
        <ArrowButton direction='right' className='col-2' onClick={nextClick} disabled={disable} />
      </div>
    </>
  );
};
