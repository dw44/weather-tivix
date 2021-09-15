import styled from 'styled-components';

const StyledWeather = styled.div`
  margin: 20px auto;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 10px;
  height: 240px;
  max-width: 700px;

`;

export default function CurrentWeather({
  cloudCover, current, dailyMax, dailyMin, feelsLike, humidity, pressure, wind,
}) {
  return (
    <StyledWeather>
      <h1>1</h1>
    </StyledWeather>
  );
}
