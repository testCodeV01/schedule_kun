const queryString = (hash: any) => {
  return Object.keys(hash).map((key) => `${key}=${hash[key]}`).join('&');
};

export const Route = () => {};

Route.regular = {
  topPath: '/',
  loginPath: '/login',
};

Route.teachers = {
  loginPath: '/teachers/login',
  informationsPath: '/teachers/informations',
  calendarMonthPath: (query: any) => `/teachers/calendar/month?${queryString(query)}`,
  calendarWeekPath: (query: any) => `/teachers/calendar/week?${queryString(query)}`,
  lessonsPath: (query: any) => `/teachers/lessons?${queryString(query)}`,
  createLessonPath: (query: any) => `/teachers/lessons/new?${queryString(query)}`,
  editLessonPath: (lessonId: number) => `/teachers/lessons/edit/${lessonId}`,
  studentsPath: '/teachers/students',
  lessonRoomsPath: '/teachers/lessonRooms',
};
