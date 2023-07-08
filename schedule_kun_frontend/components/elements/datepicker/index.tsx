import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/material_green.css';
import 'flatpickr/dist/flatpickr.css';
import { Japanese } from 'flatpickr/dist/l10n/ja.js';

import styles from './styles.module.css';
import { InputGroup } from 'react-bootstrap';

export const DatePicker = ({
  date,
  onChange
}: {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
}) => {
  return (
    <>
      <InputGroup>
        <Flatpickr
          className={`form-control ${styles.input}`}
          value={date}
          onChange={([value]: any[]) => onChange(value)}
          options={{
            locale: Japanese,
            monthSelectorType: 'static',
            allowInput: true,
            dateFormat: 'Y年m月d日',
          }}
        />
      </InputGroup>
    </>
  );
};
