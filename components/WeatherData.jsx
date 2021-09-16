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
  humidity, visibility, wind,
}) {
  // wind returned as string by api request
  const numberWind = Number(wind);
  return (
    <StyledWeather>
      <ul className="weather-data">
        <li>
          Feels Like:
          {'   '}
          {feelsLike}
          ° C
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
          {dailyMax}
          ° C
        </li>
        <li>
          Daily Minimum:
          {'   '}
          {dailyMin}
          ° C
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
          {visibility}
          {' '}
          km
        </li>

        <li>
          Wind Speed:
          {'   '}
          {Number.isNaN(wind) ? '0' : numberWind.toFixed(1)}
          {' '}
          km/h
        </li>
      </ul>
    </StyledWeather>
  );
}
