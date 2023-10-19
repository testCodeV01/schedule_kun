'use client';

import { Route } from '@/config/Route';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button, Card } from 'react-bootstrap';

const Error404: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
        <h1>404 not Found</h1>
        <Button onClick={() => router.push(Route.teachers.loginPath)}>ログイン画面へ戻る</Button>
      </Card>
    </>
  );
};

export default Error404;
