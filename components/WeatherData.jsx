/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const StyledWeather = styled.div`
  width: 50%;
  margin: 16px auto;

  .weather-data {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  li {
    margin: 14px 0;
    font-size: 1.25em;
  }
`;

export default function WeatherData({
  cloudCover, dailyMax, dailyMin, feelsLike,
  humidity, visibility, wind, imperialUnits,
}) {
  // wind returned as string by api request
  const numberWind = Number(wind);
  return (
    <StyledWeather>
      <ul className="weather-data">
        <li>
          Feels Like:
          {'   '}
          {imperialUnits ? (feelsLike * 1.8 + 32).toFixed(0) : feelsLike}
          °
          {imperialUnits ? 'F' : 'C'}
        </li>
        <li>
          Cloud Cover:
          {'   '}
          {cloudCover}
          %
        </li>
        <li>
          Daily Maximum:
          {'   '}
          {imperialUnits ? (dailyMax * 1.8 + 32).toFixed(0) : dailyMax}
          °
          {imperialUnits ? 'F' : 'C'}
        </li>
        <li>
          Daily Minimum:
          {'   '}
          {imperialUnits ? (dailyMin * 1.8 + 32).toFixed(0) : dailyMin}
          °
          {imperialUnits ? 'F' : 'C'}
        </li>

        <li>
          Humidity:
          {'   '}
          {humidity}
          %
        </li>

        <li>
          Visibility:
          {'   '}
          {imperialUnits ? (visibility / 1.609).toFixed(1) : visibility.toFixed(1)}
          {' '}
          {imperialUnits ? 'mi' : 'km'}
        </li>

        <li>
          Wind Speed:
          {'   '}
          {Number.isNaN(wind) ? '0'
            : imperialUnits
              ? (numberWind / 1.6093).toFixed(1)
              : numberWind.toFixed(1)}
          {' '}
          {imperialUnits ? 'mi/h' : 'km/h'}
        </li>
      </ul>
    </StyledWeather>
  );
}
