import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import addZero from '../util/addZero';
import DailyForecast from './DailyForecast';

const StyledForecast = styled.section`
  h3 {    
    font-weight: 500;
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 20px;
  }
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
    // eslint-disable-next-line no-param-reassign
    r[a.date] = r[a.date] || [];
    r[a.date].push(a);
    return r;
  }, Object.create(null));

  // list is sliced to display first 5 days only
  return (
    <StyledForecast>
      <h3>Five Day Forecast</h3>
      {Object.keys(dateWiseData)
        .slice(0, 5)
        .map((date) => (
          <DailyForecast
            key={uuid()}
            forecast={JSON.stringify(dateWiseData[date])}
          />
        ))}
    </StyledForecast>
  );
}
