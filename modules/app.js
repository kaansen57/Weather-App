import { UIController } from "./ui.js";
import { WeatherController } from "./weather.js";

export const App = (function (WC, UIC) {
  let data = null;
  let searchCity = "";
  const UISelectors = UIC.getSelectors();

  const getData = (searchCity) => {
    data = WC.getWeatherData(searchCity);
    return data;
  };

  const getFiveDayData = (searchCity) => {
    const data = WC.getFiveDayWeatherData(searchCity);
    return data;
  };

  const loadEventListener = () => {
    document.querySelector(UISelectors.submit).addEventListener("click", () => {
      if (searchCity && searchCity !== " ") {
        const weatherData = getData(searchCity);
        const fiveDayWeatherData = getFiveDayData(searchCity);

        fiveDayWeatherData.then((res) => {
          UIC.dailyWeatherTemplate(res);
        });

        weatherData
          .then((res) => {
            if (res.cod == "404") {
              //city not found
              UIC.tempInformation(res);
            } else {
              UIC.tempInformation(res);
              UIC.backgroundChange(res.weather[0].main);
              UIC.elementShow(true);
            }
          })
          .catch((err) => console.log("err", err));
      }
    });

    document
      .querySelector(UISelectors.searchInput)
      .addEventListener("keyup", (e) => {
        let searchValue = e.target.value;
        if (e.keyCode === 13 && searchValue && searchValue !== " ") {
          const weatherData = getData(searchCity);
          const fiveDayWeatherData = getFiveDayData(searchCity);

          fiveDayWeatherData.then((res) => {
            UIC.dailyWeatherTemplate(res);
          });

          weatherData.then((res) => {
            UIC.tempInformation(res);
            UIC.backgroundChange(res.weather[0].main);
            UIC.elementShow(true);
          });
        }
        if (searchValue && searchValue !== " ") {
          searchCity = searchValue;
        }
      });
  };

  return {
    init: function () {
      loadEventListener();
      UIC.elementShow(false);
    },
  };
})(WeatherController, UIController);

App.init();
