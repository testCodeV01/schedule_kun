import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DaySchedule: NextPage = () => {
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  useEffect(() => {
    if (!router.query.year) return;
    if (!router.query.month) return;
    if (!router.query.day) return;

    setYear(Number(router.query.year));
    setMonth(Number(router.query.month));
    setDay(Number(router.query.day));
  }, [router.query.year, router.query.month, router.query.day]);

  useEffect(() => {

  }, [year, month, day]);

  return (
    <></>
  );
};

export default DaySchedule;
