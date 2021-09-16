/* eslint-disable consistent-return */
async function getFiveDayForecast(city, country, state = '') {
// state set to null by default.
  const forecastURI = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const forecastResponse = await fetch(forecastURI);
    const forecast = await forecastResponse.json();

    // extract relevant data from json response and map on an array for future manipulation
    // 273 subtracted from all temparature values to get celsius
    // precipitation probability multiplied by 100 to get percentage
    // date-time returned as 1 string by api so split up for convenience
    const filtered = forecast.list.map((data) => ({
      temparature: data.main.temp.toFixed(0) - 273,
      humidity: data.main.humidity,
      precipitation: data.pop * 100,
      cloudCover: data.clouds.all,
      windGust: Number((data.wind.gust * 3.6).toFixed(1)),
      date: data.dt_txt.split(' ')[0],
      time: data.dt_txt.split(' ')[1],
    }));

    return filtered;
  } catch (error) {
    // return 1 if there's an error. arrangements exist to handle returned 1
    return 1;
  }
}

async function getCurrentWeather(city, country, state = '') {
  // state set to null by default.
  const forecastURI = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const weatherResponse = await fetch(forecastURI);
    const weather = await weatherResponse.json();

    // 273 subtracted from all temparature values to get celsius
    // wind * 3.6 to convert from m/s to km/h
    // visibility divided by 1000 to convert to km
    const filtered = {
      current: weather.main.temp.toFixed(0) - 273,
      feelsLike: weather.main.feels_like.toFixed(0) - 273,
      dailyMin: weather.main.temp_min.toFixed(0) - 273,
      dailyMax: weather.main.temp_max.toFixed(0) - 273,
      humidity: weather.main.humidity,
      wind: weather.wind.gust * 3.6,
      visibility: weather.visibility / 1000,
      cloudCover: weather.clouds.all,
      city: weather.name,
      country: weather.sys.country,
    };

    return filtered;
  } catch (error) {
    return 1;
  }
}

// combine fetching current weather and forecast into a single request
async function fetchData(city, country, state = '') {
  const forecast = await getFiveDayForecast(city, country, state);
  const currentWeather = await getCurrentWeather(city, country, state);
  return {
    currentWeather,
    forecast,
  };
}

export default fetchData;
