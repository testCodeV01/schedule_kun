import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Login: NextPage = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    ScheduleKunApiClient.get('/schedule_kun/teacher');
  }, []);

  const submit = () => {
    ScheduleKunApiClient.post('/schedule_kun/teacher/login', {
      email: "test01@sample.com",
      password: "password",
      password_confirmation: "password",
    });
  }

  const auth = () => {
    ScheduleKunApiClient.get('/schedule_kun/teacher/auth')
  }

  const logout = () => {
    ScheduleKunApiClient.delete('/schedule_kun/teacher/logout')
  }

  return (
    <>
      <div>wellcome!</div>
      <div><button onClick={submit}>クリック</button></div>
      <div><button onClick={auth}>クリック２</button></div>
      <div><button onClick={logout}>ログアウト</button></div>
    </>
  )
};

export default Login;
