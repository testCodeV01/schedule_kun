import { Route } from '@/config/Route';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface ChangeViewModeProps {
  mode: 'month' | 'week'
}

export const ChangeViewMode = ({ mode }: ChangeViewModeProps) => {
  const today = new Date();

  return (
    <>
      <ButtonGroup className="mb-3">
        <ToggleButton
          id="radio-1"
          value={'month'}
          type="radio"
          name="calendarMode"
          variant='outline-success'
          checked={mode === 'month'}
          onClick={() => {
            Router.push(Route.teacherCalendarMonthPath({ year: today.getFullYear(), month: today.getMonth() + 1 }));
          }}
        >
          月
        </ToggleButton>
        <ToggleButton
          id="radio-2"
          value="week"
          type="radio"
          name="calendarMode"
          variant='outline-success'
          checked={mode === 'week'}
          onClick={() => {
            Router.push(Route.teacherCalendarWeekPath({ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }));
          }}
        >
          週
        </ToggleButton>
      </ButtonGroup>
    </>
  );
};
