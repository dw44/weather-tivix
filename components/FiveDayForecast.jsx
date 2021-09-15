import styled from 'styled-components';

import addZero from '../util/addZero';
import DataTracker from '../util/DataTracker';
import DailyForecast from './DailyForecast';

const StyledForecast = styled.section`

`;

// forecast stringified before being passed as props
// to avoid issues with reference types
export default function Forecast({ forecast }) {
  const rawForecast = JSON.parse(forecast);

  const today = new Date();
  const currentDateString = `${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`;

  // API sometimes returns data from current date. this filters such data out
  const forecastFinal = rawForecast.filter((datapoint) => datapoint.date !== currentDateString);

  // group data by date
  // creates an object with 7-8 datapoints for each date at 3hr intervals
  const dateWiseData = forecastFinal.reduce((r, a) => {
    r[a.date] = r[a.date] || [];
    r[a.date].push(a);
    return r;
  }, Object.create(null));

  return (
    <StyledForecast>
      <h1>Forecast</h1>
      {Object.keys(dateWiseData)
        .map((date) => <DailyForecast forecast={JSON.stringify(dateWiseData[date])} />)}
    </StyledForecast>
  );
}
