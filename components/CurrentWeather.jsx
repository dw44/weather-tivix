import styled from 'styled-components';

import location from '../util/location';
import WeatherData from './WeatherData';

const StyledWeather = styled.div`
  padding: 24px; 
  padding-top: 0;
  
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
  city, country, imperialUnits,
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
        {imperialUnits ? (current * 1.8 + 32).toFixed(0) : current}
        {'° '}
        {imperialUnits ? 'F' : 'C'}
      </p>
      <WeatherData
        cloudCover={cloudCover}
        dailyMax={dailyMax}
        dailyMin={dailyMin}
        feelsLike={feelsLike}
        humidity={humidity}
        visibility={visibility}
        wind={wind}
        imperialUnits={imperialUnits}
      />
    </StyledWeather>
  );
}
