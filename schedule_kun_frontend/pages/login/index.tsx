import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Login: NextPage = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    ScheduleKunApiClient.get('/');
  }, []);

  const submit = () => {
    ScheduleKunApiClient.post('/', {
      name: name,
    });
  }

  return (
    <>
      <div>wellcome!</div>
      <div><button onClick={submit}>クリック</button></div>
    </>
  )
};

export default Login;
