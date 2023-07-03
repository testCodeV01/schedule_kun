import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Error401: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <span>401エラーです。</span>
        <button onClick={() => router.push('login')}>移動</button>
      </div>
    </>
  );
};

export default Error401;
