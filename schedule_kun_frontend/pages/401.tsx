import { Dashboard } from '@/components/layouts/dashboard';
import { Route } from '@/config/Route';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';

const Error401: NextPage = () => {
  return (
    <>
      <Dashboard.regular>
        <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
          <h1>401</h1>
          <Button onClick={() => Router.push(Route.regular.topPath)}>トップページへ戻る</Button>
        </Card>
      </Dashboard.regular>
    </>
  );
};

export default Error401;
