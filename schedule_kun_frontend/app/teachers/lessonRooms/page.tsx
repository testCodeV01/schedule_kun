'use client';

import { useDashboard } from '@/components/layouts/dashboard';
import { NextPage } from 'next';

const LessonRooms: NextPage = () => {
  const Dashboard = useDashboard();

  return (
    <>
      <Dashboard.teachers>
        <span>aa</span>
      </Dashboard.teachers>
    </>
  );
};

export default LessonRooms;
