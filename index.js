const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const desc = document.getElementById("desc");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const emoji = document.getElementById("emoji");
const card = document.getElementById("card");
const tempToggle = document.getElementById("tempToggle");
const APIKey = "53af102e3dda937df81929697ea6a4c2";

let isCelsius = true; // Keep track of the current temperature unit

document
  .getElementById("weatherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput").value;

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIKey}`;

    getWeather(URL);
  });

function getWeather(URL) {
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      cityName.textContent = data.name;
      updateTemperature(data.main.temp, isCelsius);
      humidity.textContent = `Humidity: ${data.main.humidity} %`;
      desc.textContent = data.weather[0].description;
      wind.textContent = `Wind: ${data.wind.speed} m/s`;
      pressure.textContent = `Pressure: ${data.main.pressure} hPa`;

      switch (data.weather[0].main.toLowerCase()) {
        case "clear":
          emoji.textContent = "☀️";
          break;
        case "clouds":
          emoji.textContent = "☁️";
          break;
        case "rain":
          emoji.textContent = "🌧️";
          break;
        case "drizzle":
          emoji.textContent = "🌦️";
          break;
        case "thunderstorm":
          emoji.textContent = "⛈️";
          break;
        case "snow":
          emoji.textContent = "❄️";
          break;
        case "mist":
        case "fog":
          emoji.textContent = "🌫️";
          break;
        default:
          emoji.textContent = "🌈";
          break;
      }

      card.style.display = "flex";
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateTemperature(kelvinTemp, isCelsius) {
  let tempValue;

  if (isCelsius) {
    tempValue = (kelvinTemp - 273.15).toFixed(2) + " °C";
  } else {
    tempValue = (((kelvinTemp - 273.15) * 9) / 5 + 32).toFixed(2) + " °F";
  }

  temp.textContent = tempValue;
}

temp.addEventListener("mouseover", () => {
  isCelsius = !isCelsius; // Toggle the temperature unit
  const currentTemp = parseFloat(temp.textContent); // Get the current temperature value
  const kelvinTemp = isCelsius
    ? ((currentTemp - 32) * 5) / 9 + 273.15
    : currentTemp + 273.15; // Convert the displayed temp back to Kelvin
  updateTemperature(kelvinTemp, isCelsius); // Update the displayed temperature
});
