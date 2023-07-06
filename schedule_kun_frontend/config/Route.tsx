import Router from 'next/router';

const queryString = (hash: any) => {
  return Object.keys(hash).map((key) => `${key}=${hash[key]}`).join('&');
};

export const Route = {
  teacherInformationsPath: '/teachers/informations',
  teacherCalendarMonthPath: (query: any) => `/teachers/calendar/month?${queryString(query)}`,
  teacherCalendarWeekPath: (query: any) => `/teachers/calendar/week?${queryString(query)}`,
  daySchedulePath: (query: any) => `/teachers/daySchedule?${queryString(query)}`
};
