import { Dashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import { NextPage } from 'next';
import Router from 'next/router';
import { Button, Card } from 'react-bootstrap';

const Error500: NextPage = () => {
  return (
    <>
      <Dashboard.regular>
        <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
          <h1>500</h1>
          <span>エラーが発生しました。恐れ入りますが、こちらから再度アクセスしてください。</span>
          <Button onClick={() => Router.push(Route.regular.topPath)}>トップページへ戻る</Button>
        </Card>
      </Dashboard.regular>
    </>
  );
};

export default Error500;
