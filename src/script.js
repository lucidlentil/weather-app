//Display current time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes <10) {
  minutes = `0${minutes}`
};

function dateTime() {
  let currentDateTime = document.querySelector("#date-time");
  currentDateTime.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;
}


//inserting data from API call into current weather conditions HTML
function getWeather(response) {
  console.log(response.data);
  let todayHigh = document.querySelector(".todayHigh");
  let todayLow = document.querySelector(".todayLow");
  let cityName = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector(".current-conditions");
  let icon = document.querySelector(".current-icon");

  celsiusHigh = response.data.main.temp_max; 
  celsiusLow = response.data.main.temp_min; 

  todayHigh.innerHTML = Math.round(response.data.main.temp_max);
  todayLow.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = response.data.name; 
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description); 

  getForecast(response.data.coord);
}

//making API call for forecast section
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl =  `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl); 
  axios.get(apiUrl).then(displayForecast); 
}

//converting index to day names for forecast section
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000); 
  let day = date.getDay(); 
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 

  return days[day]; 
}

//looping through weekdays and inserting data into forecast HTML
function displayForecast(response) {
  let forecast = response.data.daily; 
  let forecastElement = document.querySelector("#forecast"); 
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML + 
               `<div class="col-2">
                    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
                        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="45">
                    <div class="forecast-temp">
                        <div class="forecast-high">
                            ${Math.round(forecastDay.temp.max)}°
                        </div>
                        <div class="forecast-low">
                            ${Math.round(forecastDay.temp.min)}°
                        </div>
                    </div>
                </div>`; 
    }
  });
  forecastHTML = forecastHTML + `</div>`;              
  forecastElement.innerHTML = forecastHTML; 
}

//making API call for city search
function search(city) {
  let apiKey = "74ca054ff55e08af1a7a77572c080cfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

//searching for value entered into city search
function handleSubmit(event) {
  event.preventDefault(); 
  let enterCity = document.querySelector("#enter-city");
  search(enterCity.value); 
}

//making API call for current location
function findLocation(position) {
  let apiKey = "74ca054ff55e08af1a7a77572c080cfe";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeather);
}

function getLocation() { 
  navigator.geolocation.getCurrentPosition(findLocation);
}
getLocation();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

dateTime();



/* functional for current temp, but not for forecast - to work on in fut
converting temp to farenheit
function displayFahrenheit(event) {
    event.preventDefault(); 
    let todayHigh = document.querySelector(".todayHigh");
    let todayLow = document.querySelector(".todayLow");
    celsiusLink.classList.remove("active"); 
    fahrenheitLink.classList.add("active"); 
    let fahrenheitHigh = (celsiusHigh * 9) / 5 + 32; 
    let fahrenheitLow = (celsiusLow * 9) / 5 + 32;
    todayLow.innerHTML = Math.round(fahrenheitLow);
    todayHigh.innerHTML = Math.round(fahrenheitHigh); 
}
converting back to celsius
function displayCelsius(event) {
  event.preventDefault(); 
  let todayHigh = document.querySelector(".todayHigh");
  let todayLow = document.querySelector(".todayLow");
  fahrenheitLink.classList.remove("active"); 
  celsiusLink.classList.add("active"); 
  todayHigh.innerHTML = Math.round(celsiusHigh); 
  todayLow.innerHTML = Math.round(celsiusLow); 
}

let celsiusHigh = null;
let celsiusLow = null;  

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link"); 
celsiusLink.addEventListener("click", displayCelsius);
*/

