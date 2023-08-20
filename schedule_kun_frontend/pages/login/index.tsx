import { Dashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import { TeachersClient } from '@/lib/ScheduleKunApi/TeachersClient';
import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import type { NextPage } from 'next';
import Router from 'next/router';
import { Button, Card, Form } from 'react-bootstrap';

const Login: NextPage = () => {
  return (
    <>
      <Dashboard.regular>
        <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
          <Button onClick={() => Router.push(Route.teachers.loginPath)}>先生はこちら</Button>
        </Card>
      </Dashboard.regular>
    </>
  );
};

export default Login;
