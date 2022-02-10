export const WeatherController = (function () {
  const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=7be4632ebd81447daa86f730f81facf9&q=`;
  const fiveDayWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=7be4632ebd81447daa86f730f81facf9&cnt=40&q=`;

  return {
    getWeatherData: async function (city) {
      const weatherData = await fetch(`${currentWeatherApiUrl}${city}`).then(
        (res) => res.json()
      );

      console.log(weatherData);
      return weatherData;
    },
    getFiveDayWeatherData: async function (city) {
      let daily = [];
      const weatherData = await fetch(`${fiveDayWeatherApiUrl}${city}`)
        .then((res) => res.json())
        .then((res) => {
          const forecastList = res.list;
          forecastList.forEach((item) => {
            const date = new Date(item.dt_txt);
            const hour = date.getHours();

            if (hour == 12) {
              const day = new Date(date).toLocaleDateString("en-EN", {
                weekday: "long",
              });
              const temp = Math.round(item.main.temp); 

              daily.push({
                day: day,
                temp: temp,
                weatherDescription: item.weather[0].main,
              });
            }
          });
        });
      return daily;
    },
  };
})();
