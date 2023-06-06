import { ScheduleKunApiClient } from '@/lib/ScheduleKunApiClient';
import type { NextPage } from 'next';
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
      <div>wellcome!</div>
      <div><label>メールアドレス</label><input onChange={(e) => setEmail(e.target.value)}></input></div>
      <div><label>パスワード</label><input onChange={(e) => setPassword(e.target.value)}></input></div>
      <div><label>パスワード確認</label><input onChange={(e) => setPasswordConfirmation(e.target.value)}></input></div>
      <div><button onClick={submit}>クリック</button></div>
      <div><button onClick={auth}>クリック２</button></div>
      <div><button onClick={logout}>ログアウト</button></div>
    </>
  );
};

export default Login;
