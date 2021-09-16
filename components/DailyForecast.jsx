import styled from 'styled-components';

import DataTracker from '../util/DataTracker';

const Daily = styled.div`
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  width: 30%;
  margin: 30px auto;
  padding: 24px;

  .day-and-date {
    font-weight: 500;
    font-size: 1.5em;
  }
`;

export default function DailyForecast({ forecast }) {
  const forecastData = JSON.parse(forecast);
  // console.log(forecastData);

  // datapoints for 18:00, 21:00, 00:00, 03:00 => NIGHT
  // datapoints for 06:00, 09:00, 12:00, 15:00 => DAY
  const timesOfDay = {
    day: ['18:00:00', '21:00:00', '00:00:00', '03:00:00'],
    night: ['06:00:00', '09:00:00', '12:00:00', '15:00:00'],
  };

  const days = {
    0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday',
  };

  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  // standard JS date object for date corresponding to day of forecast
  // used to get day of the week for that date
  const date = new Date(`${forecastData[0].date}T${forecastData[0].time}`);
  const day = days[date.getDay()];
  const dateStringToDisplay = `${day}, ${months[date.getMonth()]} ${date.getDate()}`;

  // set up data stores for various data points to be used in forecast summary
  const daytimeTemparatures = new DataTracker();
  const nightTimeTemparatures = new DataTracker();
  const allTemparatureData = new DataTracker();
  const humidityData = new DataTracker();
  const precipitationData = new DataTracker();
  const cloudCoverData = new DataTracker();
  const windData = new DataTracker();

  // populate various data trackers set up above with relevant data
  forecastData.forEach((datapoint) => {
    allTemparatureData.insert(datapoint.temparature);
    humidityData.insert(datapoint.humidity);
    precipitationData.insert(datapoint.precipitation);
    cloudCoverData.insert(datapoint.cloudCover);
    windData.insert(datapoint.windGust);

    // separately track day and night time temparatures
    if (timesOfDay.day.includes(datapoint.time)) {
      daytimeTemparatures.insert(datapoint.temparature);
    } else {
      nightTimeTemparatures.insert(datapoint.temparature);
    }
  });

  // average of mean and mode for daily average temparature
  const dailyAverageTemparature = (allTemparatureData.showMode()
    + allTemparatureData.showMean()) / 2;

  return (
    <Daily>
      <h4 className="day-and-date">{dateStringToDisplay}</h4>
      <p>
        Daily Average:
        {' '}
        {dailyAverageTemparature.toFixed(0)}
        {'° '}
        C
      </p>
      <p>
        Daily Maximum:
        {' '}
        {allTemparatureData.showMax()}
        {'° '}
        C
      </p>
      <p>
        Daily Minimum:
        {' '}
        {allTemparatureData.showMin()}
        {'° '}
        C
      </p>
      <p>
        Day Time Average:
        {' '}
        {daytimeTemparatures.showMean()}
        {'° '}
        C
      </p>
      <p>
        Night Time Average:
        {' '}
        {nightTimeTemparatures.showMean()}
        {'° '}
        C
      </p>
      <p>
        Humidity:
        {' '}
        {humidityData.showMean()}
        %
      </p>
      <p>
        Chance of Precipitation:
        {' '}
        {precipitationData.showMean()}
        %
      </p>
      <p>
        Cloud Cover:
        {' '}
        {cloudCoverData.showMean()}
        %
      </p>
      <p>
        Average Wind Speed:
        {' '}
        {windData.showMean()}
        km/h
      </p>

    </Daily>
  );
}
