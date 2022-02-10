export const UIController = (function () {
  const Selectors = {
    submit: "#submit",
    searchInput: "#search-input",
    background: ".weather-container",
    temp: "#temp",
    status: "#status",
    statusDetail: "#status-detail",
    cityName: "#city-name",
  };

  const bgChange = function (status) {
    const bgImg = document.querySelector(Selectors.background);
    bgImg.style.opacity = 0;
      bgImg.style.background  = `url(../img/${status}.png) no-repeat center center`;
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
    tempInformation: function (data) {
      if (data.cod === "404") {
        //city not found
        document.querySelector(Selectors.status).textContent =
          data.message + "!";
        UIController.elementShow(false);
      } else {
        UIController.elementShow(true);
        document.querySelector(
          Selectors.cityName
        ).textContent = `${data.name} , ${data.sys.country}`;
        
        document.querySelector(Selectors.temp).textContent =
          Math.round(data.main.temp) + "°";
        document.querySelector(Selectors.status).textContent =
          data.weather[0].main;
        document.querySelector(Selectors.statusDetail).textContent =
          data.weather[0].description;
      }
    },
    elementShow: function (isShow) {
      // temp and temp description display none or block
      if (!isShow) {
        document.querySelector(Selectors.temp).style.display = "none";
        document.querySelector(Selectors.statusDetail).style.display = "none";
        document.querySelector(Selectors.cityName).style.display = "none";
      } else {
        document.querySelector(Selectors.temp).style.display = "block";
        document.querySelector(Selectors.statusDetail).style.display = "block";
        document.querySelector(Selectors.cityName).style.display = "block";
      }
    },
  };
})();