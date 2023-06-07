import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import type { NextPage } from 'next';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    ScheduleKunApiClient.get('/schedule_kun/teacher');
  }, []);

  const submit = () => {
    ScheduleKunApiClient.post('/schedule_kun/teacher/login', {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    });
  };

  const auth = () => {
    ScheduleKunApiClient.get('/schedule_kun/teacher/auth');
  };

  const logout = () => {
    ScheduleKunApiClient.delete('/schedule_kun/teacher/logout');
  };

  return (
    <>
      <div>wellcome!!</div>
      <TextField required label="メールアドレスです" onChange={(e) => setEmail(e.target.value)} className='ml-4'/>
      <TextField required label="パスワード" type='password' onChange={(e) => setPassword(e.target.value)} className='ml-4'/>
      <TextField required label="パスワード確認" type='password' onChange={(e) => setPasswordConfirmation(e.target.value)} className='ml-4'/>
      <div><button onClick={submit}>クリック</button></div>
      <div><button onClick={auth}>クリック２</button></div>
      <div><button onClick={logout}>ログアウト</button></div>
    </>
  );
};

export default Login;
