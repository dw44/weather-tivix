import styled from 'styled-components';

import DataTracker from '../util/DataTracker';

const Daily = styled.div`
  border: 1px solid red;
  min-height: 120px;
  width: 520px;
  margin: 10px auto;
`;

export default function DailyForecast({ forecast }) {
  // datapoints for 18:00, 21:00, 00:00, 03:00 => NIGHT
  // datapoints for 06:00, 09:00, 12:00, 15:00 => DAY
  const rawForecast = JSON.parse(forecast);

  const timesOfDay = {
    day: ['18:00:00', '21:00:00', '00:00:00', '03:00:00'],
    night: ['06:00:00', '09:00:00', '12:00:00', '15:00:00'],
  };

  return (
    <Daily />
  );
}
