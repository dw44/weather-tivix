import Head from 'next/head';
import { useEffect } from 'react';

import Global from '../styles/Global';
import fetchData from '../util/fetchData';

export default function Home() {
  useEffect(() => {
    fetchData('Toronto', 'CA');
    // async function f() {
    //   const s = await fetchData('Toronto', 'CA');
    //   console.log(s);
    // }

    // f();
  }, []);

  return (
    <div>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Coding Challenge for Ti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global />
    </div>
  );
}
