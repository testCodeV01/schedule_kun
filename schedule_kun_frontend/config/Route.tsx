import Router from 'next/router';

const queryString = (hash: any) => {
  return Object.keys(hash).map((key) => `${key}=${hash[key]}`).join('&');
};

export const Route = {
  teacherLoginPath: '/teachers/login',
  teacherInformationsPath: '/teachers/informations',
  teacherCalendarMonthPath: (query: any) => `/teachers/calendar/month?${queryString(query)}`,
  teacherCalendarWeekPath: (query: any) => `/teachers/calendar/week?${queryString(query)}`,
  daySchedulePath: (query: any) => `/teachers/daySchedule?${queryString(query)}`,
  editLessonPath: (lessonId: number) => `/teachers/daySchedule/edit/${lessonId}`,
  teacherStudentsPath: '/teachers/students',
  teacherLessonRoomsPath: '/teachers/lessonRooms',
};
