import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';

import CurrentWeather from '../components/CurrentWeather';
import FiveDayForecast from '../components/FiveDayForecast';
import Header from '../components/Header';
import NoData from '../components/NoData';
import QueryError from '../components/QueryError';

import Global from '../styles/Global';
import fetchData from '../util/fetchData';

const MainPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f9ff;
  position: relative;

  .weather-container {
    display: grid;
    grid-template-columns: 30% 70%;
    padding-top: 30px;

    @media only screen and (max-width: 992px) {
      grid-template-columns: 100%;
    }
  }
`;

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showError, setShowError] = useState(false);
  const [imperial, setImperial] = useState(false);

  const getWeather = async (city, country, state = '') => {
    const weather = await (fetchData(city, country, state));
    // only update state if valid data is recieve. 1 signifies an error
    if (weather.forecast !== 1) {
      setCurrentWeather(weather.currentWeather);
      setForecast(weather.forecast);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // toggle between metric and imperial units
  const toggleUnits = () => setImperial(!imperial);

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
        toggleUnits={toggleUnits}
        imperialUnits={imperial}
      />
      {showError && <QueryError text="No Results Found.Please Enter A Valid Query" />}
      {currentWeather
        ? (
          <div className="weather-container">
            {currentWeather
              ? <CurrentWeather imperialUnits={imperial} {...currentWeather} />
              : null}
            {forecast
              ? <FiveDayForecast imperialUnits={imperial} forecast={JSON.stringify(forecast)} />
              : null}
          </div>
        )
        : <NoData />}

    </MainPage>
  );
}
