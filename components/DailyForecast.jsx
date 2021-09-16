import styled from 'styled-components';
import { useState } from 'react';

import DataTracker from '../util/DataTracker';

const Daily = styled.div`
  border-radius: 4px;
  background-color: #eee;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  width: 40%;
  min-width: 400px;
  margin: 30px auto;
  padding: 24px;
  
  .day-and-date {
    font-weight: 500;
    font-size: 1.5em;
    margin-bottom: 16px;
    color: #243D44;
  }

  ul {
    display: none;
  }

  li {
    margin-bottom: 10px;
    color: #167A8B;
    font-size: 1.07em;
    font-weight: 500;
  }

  .heading {
    color: #243D44;
  }

  button {
    display: block;
    height: 40px;
    font-weight: 500;
    font-size: 24px;
    width: 200px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.4s;
    background-color: #ccc;
  }

  button:hover {
    background-color: #aaa;
  }

  .details {
    display: block;
  }
`;

export default function DailyForecast({ forecast, imperialUnits }) {
  const [showDetails, setShowDetails] = useState(false);
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

  // toggle whether details for the day's forecast are displayed
  const toggleDisplay = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Daily>
      <h4 className="day-and-date">{dateStringToDisplay}</h4>
      <ul className={showDetails ? 'details' : ''}>
        <li>
          {' '}
          <p>
            <span className="heading">Daily Average:</span>
            {' '}
            <span className="value">
              {imperialUnits
                ? (dailyAverageTemparature * 1.8 + 32).toFixed(0)
                : dailyAverageTemparature.toFixed(0)}
            </span>
            {'° '}
            {imperialUnits ? 'F' : 'C'}
          </p>
        </li>

        <li>
          {' '}
          <p>
            <span className="heading">Daily Maximum:</span>
            {' '}
            {imperialUnits
              ? (allTemparatureData.showMax() * 1.8 + 32).toFixed(0)
              : allTemparatureData.showMax()}
            {'° '}
            {imperialUnits ? 'F' : 'C'}
          </p>
        </li>

        <li>
          <p>
            <span className="heading">Daily Minimum</span>
            :
            {' '}
            {imperialUnits
              ? (allTemparatureData.showMin() * 1.8 + 32).toFixed(0)
              : allTemparatureData.showMin()}
            {'° '}
            {imperialUnits ? 'F' : 'C'}
          </p>
        </li>

        <li>
          <p>
            <span className="heading">Day Time Average</span>
            :
            {' '}
            {imperialUnits
              ? (daytimeTemparatures.showMean() * 1.8 + 32).toFixed(0)
              : daytimeTemparatures.showMean()}
            {'° '}
            {imperialUnits ? 'F' : 'C'}
          </p>
        </li>

        <li>
          {' '}
          <p>
            <span className="heading">Night Time Average:</span>
            {' '}
            {imperialUnits
              ? (nightTimeTemparatures.showMean() * 1.8 + 32).toFixed(0)
              : nightTimeTemparatures.showMean()}
            {'° '}
            {imperialUnits ? 'F' : 'C'}
          </p>
        </li>

        <li>
          <p>
            <span className="heading">Humidity:</span>
            {' '}
            {humidityData.showMean()}
            %
          </p>
        </li>

        <li>
          <p>
            <span className="heading">Chance of Precipitation:</span>
            {' '}
            {precipitationData.showMean()}
            %
          </p>
        </li>

        <li>
          {' '}
          <p>
            <span className="heading">Cloud Cover:</span>
            {' '}
            {cloudCoverData.showMean()}
            %
          </p>
        </li>

        <li>
          <p>
            <span className="heading">Average Wind Speed:</span>
            {' '}
            {imperialUnits ? (windData.showMean() * 1.6).toFixed(1) : windData.showMean()}
            {imperialUnits ? 'mi/h' : 'km/h'}
          </p>
        </li>
      </ul>
      <button type="button" onClick={toggleDisplay}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </Daily>
  );
}
