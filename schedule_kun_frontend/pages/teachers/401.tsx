import { Route } from '@/config/Route';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

const Error401: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <span>401エラーです。</span>
        <Button onClick={() => router.push(Route.teachers.loginPath)}>移動</Button>
      </div>
    </>
  );
};

export default Error401;
