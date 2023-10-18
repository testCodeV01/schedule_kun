'use client';

import { useDashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button, Card } from 'react-bootstrap';

const Error404: NextPage = () => {
  const router = useRouter();
  const Dashboard = useDashboard();

  return (
    <>
      <Dashboard.regular>
        <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
          <h1>404 not Found</h1>
          <Button onClick={() => router.push(Route.teachers.loginPath)}>ログイン画面へ戻る</Button>
        </Card>
      </Dashboard.regular>
    </>
  );
};

export default Error404;
