/* eslint-disable no-unused-vars */
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';

import CurrentWeather from '../components/CurrentWeather';
import FiveDayForecast from '../components/FiveDayForecast';
import Header from '../components/Header';

import Global from '../styles/Global';
import fetchData from '../util/fetchData';

const MainPage = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [imperialUnits, setImperialUnits] = useState(false);

  const getWeather = async (city, country, state = '') => {
    const weather = await (fetchData(city, country, state));
    setCurrentWeather(weather.currentWeather);
    setForecast(weather.forecast);
  };

  const toggleUnits = () => setImperialUnits(!imperialUnits);

  return (
    <MainPage>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Coding Challenge for Ti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global />
      <Header
        getWeather={getWeather}
        setImperialUnits={setImperialUnits}
      />
      {currentWeather
        ? <CurrentWeather {...currentWeather} />
        : null}
      {forecast
        ? <FiveDayForecast forecast={JSON.stringify(forecast)} />
        : null}
    </MainPage>
  );
}

// fivedayforecast props => JSON.stringify(forecast)
// currentweather props => ...currentWeather
