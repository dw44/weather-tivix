import styled from 'styled-components';

const StyledWeather = styled.div`

`;

export default function CurrentWeather({
  cloudCover, current, dailyMax, dailyMin, feelsLike, humidity, pressure, wind,
}) {
  return (
    <StyledWeather>
      <h1 />
    </StyledWeather>
  );
}
