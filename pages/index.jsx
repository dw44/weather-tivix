import Head from 'next/head';
import { useEffect } from 'react';

import Global from '../styles/Global';

export default function Home() {
  useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Toronto,CA&appid=9fb8e41a804240e128d5aa77e744bfcc')
      .then((response) => response.json())
      .then((data) => {
        data.list.forEach((dataset) => console.log(dataset.dt_txt));
      });
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
