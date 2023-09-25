import { Route } from '@/config/Route';
import { TeachersClient } from '@/lib/ScheduleKunApi/TeachersClient';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Navbar } from 'react-bootstrap';

const TeacherLogin: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    TeachersClient.get('/login');
  }, []);

  const submit = () => {
    TeachersClient.post('/login', {
      sessions: {
        email: email,
        password: password,
      }
    })
      .then(() => {
        const today = new Date();

        router.push(Route.teachers.calendarMonthPath({
          year: today.getFullYear(), month: today.getMonth() + 1
        }));
      });
  };

  // const auth = () => {
  //   TeachersClient.get('/auth');
  // };

  // const logout = () => {
  //   TeachersClient.delete('/logout');
  // };

  return (
    <>
      <Navbar className='color-combo-main'>
        <Container fluid>
          welcom
        </Container>
      </Navbar>
      <Card className="p-5 m-auto mt-5" style={{ width: '500px', height: '500px' }}>
        <Form.Group className="mb-3">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>パスワード</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button onClick={submit}>ログイン</Button>
        {/* <Button onClick={auth}>クリック2</Button>
        <Button onClick={logout}>ログアウト</Button> */}
      </Card>
    </>
  );
};

export default TeacherLogin;
