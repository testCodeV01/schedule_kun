'use client';

import { useDashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button, Card } from 'react-bootstrap';

const Login: NextPage = () => {
  const router = useRouter();
  const Dashboard = useDashboard();

  return (
    <>
      <Dashboard.regular>
        <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
          <Button onClick={() => router.push(Route.teachers.loginPath)}>先生はこちら</Button>
        </Card>
      </Dashboard.regular>
    </>
  );
};

export default Login;
