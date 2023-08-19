import { Route } from '@/config/Route';
import { TeachersClient } from '@/lib/ScheduleKunApi/TeachersClient';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TeacherLogin: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    TeachersClient.get('/');
  }, []);

  const submit = () => {
    TeachersClient.post('/login', {
      sessions: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }
    })
      .then(() => {
        const today = new Date();

        router.push(Route.teacherCalendarMonthPath({
          year: today.getFullYear(), month: today.getMonth() + 1
        }));
      });
  };

  const auth = () => {
    TeachersClient.get('/auth');
  };

  const logout = () => {
    TeachersClient.delete('/logout');
  };

  return (
    <>
      <div>wellcome!!</div>
      <input required onChange={(e) => setEmail(e.target.value)} className='ml-4'/>
      <input required onChange={(e) => setPassword(e.target.value)} className='ml-4'/>
      <input required onChange={(e) => setPasswordConfirmation(e.target.value)} className='ml-4'/>
      <div><button onClick={submit}>クリック</button></div>
      <div><button onClick={auth}>クリック２</button></div>
      <div><button onClick={logout}>ログアウト</button></div>
    </>
  );
};

export default TeacherLogin;
