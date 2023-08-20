
import { Route } from '@/config/Route';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Error409: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <span>409エラーです。</span>
        <button onClick={() => router.push(Route.teachers.loginPath)}>移動</button>
      </div>
    </>
  );
};

export default Error409;
