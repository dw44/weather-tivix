import styled from 'styled-components';

import DataTracker from '../util/DataTracker';

const Daily = styled.div`
  border: 1px solid red;
  min-height: 120px;
  width: 520px;
  margin: 10px auto;
`;

export default function DailyForecast({ forecast }) {
  const forecastData = JSON.parse(forecast);
  console.log(forecastData);

  // datapoints for 18:00, 21:00, 00:00, 03:00 => NIGHT
  // datapoints for 06:00, 09:00, 12:00, 15:00 => DAY
  const timesOfDay = {
    day: ['18:00:00', '21:00:00', '00:00:00', '03:00:00'],
    night: ['06:00:00', '09:00:00', '12:00:00', '15:00:00'],
  };

  const days = {
    0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday',
  };

  // standard JS date object for date corresponding to day of forecast
  // used to get day of the week for that date
  const date = new Date(`${forecastData[0].date}T${forecastData[0].time}`);
  const day = days[date.getDay()];

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

  return (
    <Daily>
      <p>Daily Max - Daily Min - Day Time Max - Day Time Min - Average Humidity</p>
      <p>Precipitation - Average Conditions - Average Wind Gust</p>
    </Daily>
  );
}

/*
      temparature: data.main.temp.toFixed(0) - 273,
      humidity: data.main.humidity,
      precipitation: data.pop * 100,
      conditions: data.weather[0].description,
      cloudCover: data.clouds.all,
      windGust: Number((data.wind.gust * 3.6).toFixed(1)),
      date: data.dt_txt.split(' ')[0],
      time: data.dt_txt.split(' ')[1],
*/
