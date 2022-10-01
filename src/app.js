function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if(hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if(minutes <10){
    minutes = `0${minutes}`;
  }
  let days = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"]
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue','Wed','Thu','Fri','Sat'];
  return days[day]
}

function displayForecast(response) { 
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function(forecastDay,index){
    if (index < 6) {
    forecastHtml = forecastHtml + `<div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>
    <div class="weather-forecast-temperature">
       <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
       <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  </div>`
    }
  })
  
  forecastHtml =forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates){
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000)

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  
  }

function search(city){
let apiKey = "8678ae192384fc42897c60c124159d58";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York")

displayForecast ()

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiousLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature* 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
}

function displayCelsiousTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiousLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiousLink = document.querySelector("#celsious-link");
celsiousLink.addEventListener("click", displayCelsiousTemperature);