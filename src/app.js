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

function displayForecast () {
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHtml = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  
  days.forEach(function(day){
    forecastHtml = forecastHtml + `<div class="col-2">
    <div class="weather-forecast-date">Thu</div>
    <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" width="42"/>
    <div class="weather-forecast-temperature">
       <span class="weather-forecast-temperature-max">18°</span>
       <span class="weather-forecast-temperature-min">12°</span>
    </div>
  </div>`
  })
  
 
  forecastHtml =forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function displayTemperature(response){
  console.log(response.data)
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

  celsiusTemperature = response.data.main.temp;
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