export const UIController = (function () {
  const Selectors = {
    submit: "#submit",
    searchInput: "#search-input",
    background: ".weather-container",
    temp: "#temp",
    status: "#status",
    statusDetail: "#status-detail",
    cityName: "#city-name",
    weatherFooter: ".weather-footer",
    fiveDayWeatherDetail: ".weather-details-wrapper",
    detailCityName: ".weather-details-city",
    wind: ".wind",
    deg: "#deg",
    humidity: "#humidity",
  };

  const bgChange = function (status) {
    const bgImg = document.querySelector(Selectors.background);
    bgImg.style.opacity = 0;
    bgImg.style.background = `url(../img/${status}.png) no-repeat center center`;
    bgImg.style.opacity = 1;
  };
  return {
    getSelectors: function () {
      return Selectors;
    },
    backgroundChange: function (status) {
      if (status === "Clouds") bgChange(status);
      else if (status === "Rain") bgChange(status);
      else if (status === "Snow") bgChange(status);
      else if (status === "Clear") bgChange(status);
      else if (status === "Mist") bgChange(status);
    },
    windDegreeCalculator: function (deg) {
      let windDirection = "";
      if (deg > 45 && deg <= 135) {
        windDirection = "East";
      } else if (deg > 135 && deg <= 225) {
        windDirection = "South";
      } else if (deg > 225 && deg <= 315) {
        windDirection = "West";
      } else {
        windDirection = "North";
      }

      return windDirection;
    },
    tempInformation: function (data) {
      if (data.cod === "404") {
        //city not found
        document.querySelector(Selectors.status).textContent =
          data.message + "!";
        UIController.elementShow(false);
      } else {
        UIController.elementShow(true);

        const deg = UIController.windDegreeCalculator(data.wind.deg);

        document.querySelector(
          Selectors.cityName
        ).textContent = `${data.name} , ${data.sys.country}`; // city name and country

        document.querySelector(
          Selectors.detailCityName
        ).textContent = `${data.name} , ${data.sys.country}`; // city name and country

        document.querySelector(Selectors.temp).textContent =
          Math.round(data.main.temp) + "°"; // temp

        document.querySelector(Selectors.status).textContent =
          data.weather[0].main; // status

        document.querySelector(Selectors.statusDetail).textContent =
          data.weather[0].description; //status description

        document.querySelector(
          Selectors.deg
        ).innerHTML = `Direction : ${deg}  <br> Speed : ${data.wind.speed} m/s`;
        //wind speed and degree

        document.querySelector(
          Selectors.humidity
        ).textContent = `${data.main.humidity} %`; //humidity ratio
      }
    },
    dailyWeatherTemplate: function (data) {
      // weekly status template
      let template = "";
      data.forEach((data) => {
        let weatherIcon = "clouds";
        //icon set
        if (data.weatherDescription == "Clouds") weatherIcon = "clouds";
        else if (data.weatherDescription == "Clear") weatherIcon = "sun";
        else if (data.weatherDescription == "Snow") weatherIcon = "snow";
        else if (data.weatherDescription == "Rain") weatherIcon = "rain";
        else if (data.weatherDescription == "Mist") weatherIcon = "wind";
        template += `
                        <div class="weather-details-content">
                        <h6 class="time">${data.day}</h6>
                        <img class="weather-icon" src="/img/${weatherIcon}-icon.png" alt="">
                        <h6 class="temp">${data.temp}°</h6>
                        </div>
       `;
      });

      document.querySelector(Selectors.fiveDayWeatherDetail).innerHTML =
        template;
    },
    elementShow: function (isShow) {
      // temp and temp description display none or block
      if (!isShow) {
        document.querySelector(Selectors.temp).style.display = "none";
        document.querySelector(Selectors.statusDetail).style.display = "none";
        document.querySelector(Selectors.cityName).style.display = "none";
        document.querySelector(Selectors.wind).style.display = "none";
        document.querySelector(Selectors.weatherFooter).style.opacity = 0;
      } else {
        document.querySelector(Selectors.temp).style.display = "block";
        document.querySelector(Selectors.statusDetail).style.display = "block";
        document.querySelector(Selectors.cityName).style.display = "block";
        document.querySelector(Selectors.wind).style.display = "flex";
        document.querySelector(Selectors.weatherFooter).style.opacity = 1;
      }
    },
  };
})();
