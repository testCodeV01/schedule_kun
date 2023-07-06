import { Button } from 'react-bootstrap';

import styles from './styles.module.css';

const ArrowButton = ({
  className = '',
  onClick,
  disabled,
  direction,
  arrowColor,
}: {
  className?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  direction: 'left' | 'right';
  arrowColor?: string;
}) => {
  const leftArrow = () => {
    return (
      <>
        <Button className={`${className} ${styles.monthpicker_prev_month}`} onClick={onClick} disabled={disabled}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
            <g></g>
            <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z" stroke={arrowColor} fill={arrowColor}></path>
          </svg>
        </Button>
      </>
    );
  };

  const rightArrow = () => {
    return (
      <>
        <Button className={`${className} ${styles.monthpicker_next_month}`} onClick={onClick} disabled={disabled}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
            <g></g>
            <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z" stroke={arrowColor} fill={arrowColor}></path>
          </svg>
        </Button>
      </>
    );
  };

  switch (direction) {
    case 'left':
      return leftArrow();
    case 'right':
      return rightArrow();
  }
};

export default ArrowButton;
