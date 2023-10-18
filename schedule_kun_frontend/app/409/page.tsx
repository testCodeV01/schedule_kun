'use client';

import { useDashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button, Card } from 'react-bootstrap';

const Error409: NextPage = () => {
  const router = useRouter();
  const Dashboard = useDashboard();

  return (
    <>
      <Dashboard.regular>
        <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
          <h1>409</h1>
          <span>エラーが発生しました。恐れ入りますが、こちらから再度アクセスしてください。</span>
          <Button onClick={() => router.push(Route.regular.topPath)}>トップページへ戻る</Button>
        </Card>
      </Dashboard.regular>
    </>
  );
};

export default Error409;
