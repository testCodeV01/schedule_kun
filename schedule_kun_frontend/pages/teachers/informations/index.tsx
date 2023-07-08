import Dashboard from '@/components/layouts/dashboard';
import type { NextPage } from 'next';
import { Card } from 'react-bootstrap';

const Informations: NextPage = () => {
  return (
    <>
      <Dashboard>
        <Card>
          <Card.Header>
            お知らせ
          </Card.Header>
          <Card.Body>
            本日は19:00までとなっています。
          </Card.Body>
        </Card>
        <Card className="mt-3">
          <Card.Header>
            今日のレッスン
          </Card.Header>
          <Card.Body>
            <Card>
              <Card.Header>
                英語3年生
              </Card.Header>
              <Card.Body>
                欠席者: 田中太郎, 角田斗真
              </Card.Body>
            </Card>
            <Card className='mt-3'>
              <Card.Header>
                英語1年生
              </Card.Header>
              <Card.Body>
                欠席者: なし
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Dashboard>
    </>
  );
};

export default Informations;
