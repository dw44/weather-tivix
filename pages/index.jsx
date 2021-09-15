import Head from 'next/head';
import { useEffect, useState } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import FiveDayForecast from '../components/FiveDayForecast';
import Header from '../components/Header';

import Global from '../styles/Global';
import fetchData from '../util/fetchData';

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const getWeather = async () => {
    const weather = await (fetchData('Toronto', 'CA'));
    setCurrentWeather(weather.currentWeather);
    setForecast(weather.forecast);
    // console.log(currentWeather);
    // console.log(forecast);
  };

  return (
    <div>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Coding Challenge for Ti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global />
      <Header />
      {currentWeather && (
      <CurrentWeather {...currentWeather} />
      )}
      {forecast && (
      <FiveDayForecast forecast={JSON.stringify(forecast)} />
      )}
      <button type="button" onClick={getWeather}>Get Weather</button>
    </div>
  );
}
