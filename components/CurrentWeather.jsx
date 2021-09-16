import styled from 'styled-components';

import location from '../util/location';
import WeatherData from './WeatherData';

const StyledWeather = styled.div`
  padding: 24px; 
  
  h2 {
    font-weight: 500;
    font-size: 3em;
    text-align: center;
  }
  
  .temparature {
    font-weight: 500;
    font-size: 2.5em;
    margin: 20px;
    text-align: center;
  }

`;

export default function CurrentWeather({
  cloudCover, current,
  dailyMax, dailyMin,
  feelsLike, humidity,
  visibility, wind,
  city, country,
}) {
  return (
    <StyledWeather>
      <h2>
        {city}
        ,
        {' '}
        {location.countryCodes[country]}
      </h2>
      <p className="temparature">
        {current}
        {'° '}
        C
      </p>
      <WeatherData
        cloudCover={cloudCover}
        dailyMax={dailyMax}
        dailyMin={dailyMin}
        feelsLike={feelsLike}
        humidity={humidity}
        visibility={visibility}
        wind={wind}
      />
    </StyledWeather>
  );
}
