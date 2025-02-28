let button = document.getElementById("button");
let inputCity = document.getElementById("weather-text");

button.addEventListener("click", function() {
  // Get the city value from the input
  let city = inputCity.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  // OpenWeatherMap API configuration
  const API_KEY = "c9eff5a4abc0596ceb530f670cfa54bf";
  const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  // Create a new XMLHttpRequest object
  let request = new XMLHttpRequest();
  request.open("GET", endPoint, true);
  request.send();

  // When the API call is complete and successful
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      let weatherData = JSON.parse(request.responseText);
      console.log(weatherData); // Check the API response in the console

      // Retrieve and convert temperature from Kelvin to Celsius
      let tempKelvin = weatherData.main.temp;
      let tempCelsius = Math.round(tempKelvin - 273.15);

      // Update the main temperature text (h1 with class "maintext")
      let mainTextElem = document.querySelector(".maintext");
      mainTextElem.textContent = tempCelsius;

      let weatherText = weatherData.weather[0].description;
      document.querySelector(".message").textContent = `${weatherText}`;

      let localeText = weatherData.name;
      document.querySelector(".locationtext").textContent = `${localeText}`;

      // Update the humidity (h2 with class "humid")
      let humidityElem = document.querySelector(".humid");
      humidityElem.textContent = weatherData.main.humidity + "%";

      // Update the wind speed (h2 with class "windspeed")
      let windSpeedElem = document.querySelector(".windspeed");
      windSpeedElem.textContent = weatherData.wind.speed + " m/s";

      // Update the wind direction (h2 with class "winddirection")
      let windDirectionElem = document.querySelector(".winddirection");
      windDirectionElem.textContent = weatherData.wind.deg + "°";

      // Change background color based on weather description
      changeBackgroundColor(weatherText);
    }
  };
});

function changeBackgroundColor(weatherDescription) {
  let mainBox = document.querySelector(".main-box");

  switch (weatherDescription.toLowerCase()) {
    case "clear sky":
      mainBox.style.backgroundColor = "lightblue";
      break;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      mainBox.style.backgroundColor = "lightgrey";
      break;
    case "shower rain":
    case "rain":
      mainBox.style.backgroundColor = "lightcoral";
      break;
    case "thunderstorm":
      mainBox.style.backgroundColor = "darkgrey";
      break;
    case "snow":
      mainBox.style.backgroundColor = "lightcyan";
      break;
    case "mist":
    case "fog":
      mainBox.style.backgroundColor = "lightyellow";
      break;
    default:
      mainBox.style.backgroundColor = "white";
  }
}
