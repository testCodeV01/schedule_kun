'use client';

import { Dashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import { useRouter } from 'next/navigation';
import { Button, Card } from 'react-bootstrap';


export default function Home() {
  const router = useRouter();

  return (
    <>
      <Dashboard.regular>
        <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
          スケジュール管理アプリ
          <Button onClick={() => router.push(Route.regular.loginPath)}>さっそくはじめる</Button>
        </Card>
      </Dashboard.regular>
    </>
  );
}
