import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Japanese } from 'flatpickr/dist/l10n/ja.js';
import { InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const TimePicker = ({
  time,
  onChange,
  style = {},
  isInvalid = false,
}: {
  time: Date,
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
  style?: any;
  isInvalid?: boolean;
}) => {
  const [update,setUpdata]=useState<boolean>(false);
  const [invalidClass, setInvalidClass] = useState('');

  useEffect(() => {
    setInvalidClass(isInvalid ? 'is-invalid' : '');
  }, [isInvalid]);

  useEffect(() => {
    setUpdata(update?false:true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidClass]);

  return (
    <>
      <InputGroup style={style}>
        <Flatpickr
          data-enable-time
          className={`form-control ${invalidClass}`}
          value={time}
          onChange={([value]: any[]) => onChange(new Date(`${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`))}
          options={{
            locale: Japanese,
            allowInput: true,
            noCalendar: true,
            dateFormat: 'H:i',
          }}
        />
      </InputGroup>
    </>
  );
};

export default TimePicker;
