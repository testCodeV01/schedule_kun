import { useState } from 'react';
import styles from './styles.module.css';
import { Button } from 'react-bootstrap';

export const MonthPicker = ({
  date,
  onChangeDate,
  disable,
}: {
  date: Date;
  onChangeDate: (value: any) => void;
  disable?: boolean;
}) => {
  // const [date, setDate] = useState<Date>(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const prevClick = () => {
    date.setMonth(date.getMonth() - 1);

    onChangeDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const nextClick = () => {
    date.setMonth(date.getMonth() + 1);

    onChangeDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const changeYear = (value: number) => {
    date.setFullYear(value);
    console.log(value);

    onChangeDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const yearUp = () => {
    date.setFullYear(year + 1);

    onChangeDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const yearDown = () => {
    date.setFullYear(year - 1);

    onChangeDate(new Date(date));
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  return (
    <>
      <div className="row flatpickr-months w-100">
        <Button className={`col-2 ${styles.monthpicker_prev_month}`} onClick={prevClick} disabled={disable}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
            <g></g>
            <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
          </svg>
        </Button>
        <div className="flatpickr-month col-8 overflow-auto">
          <div className="flatpickr-current-month">
            <span className="cur-month">{month}月 </span>
            <div className="numInputWrapper">
              <input
                className={`numInput cur-year ${styles.numInput}`}
                type="number"
                value={year}
                onChange={(e: any) => changeYear(e.target.value)}
                disabled={disable}
              />
              <span className="arrowUp" onClick={yearUp}></span>
              <span className="arrowDown" onClick={yearDown}></span>
            </div>
          </div>
        </div>
        <Button className={`col-2 ${styles.monthpicker_next_month}`} onClick={nextClick} disabled={disable}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
            <g></g>
            <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path>
          </svg>
        </Button>
      </div>
    </>
  );
};