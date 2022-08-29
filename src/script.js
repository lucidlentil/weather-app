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
dateTime();

//Search button - when a user searches for a city, it should display the name of the city on the result page and the current temp of the city

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
  
}

function search(city) {
  let apiKey = "74ca054ff55e08af1a7a77572c080cfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault(); 
  let enterCity = document.querySelector("#enter-city");
  search(enterCity.value); 
}

let locationButton = document.querySelector(".location-button");

function findLocation(position) {
  let apiKey = "74ca054ff55e08af1a7a77572c080cfe";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeather);
}

function getLocation(event) {
  event.preventDefault(); 
  navigator.geolocation.getCurrentPosition(findLocation);
}

locationButton.addEventListener("click", getLocation);

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

function displayCelsius(event) {
  event.preventDefault(); 
  let todayHigh = document.querySelector(".todayHigh");
  let todayLow = document.querySelector(".todayLow");
  fahrenheitLink.classList.remove("active"); 
  celsiusLink.classList.add("active"); 
  todayHigh.innerHTML = Math.round(celsiusHigh); 
  todayLow.innerHTML = Math.round(celsiusLow); 
}

//looping through weekdays and inserting HTML
function displayForecast() {
  let forecastElement = document.querySelector("#forecast"); 
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function(day) {
    forecastHTML = forecastHTML + 
               `<div class="col-2">
                    <div class="forecast-day">${day}</div>
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="45">
                    <div class="forecast-temp">
                        <span class="forecast-high">
                            20°
                        </span>
                        <span class="forecast-low">
                            13°
                        </span>
                    </div>
                </div>`; 
  });
  forecastHTML = forecastHTML + `</div>`;        
          
  forecastElement.innerHTML = forecastHTML; 
}

let celsiusHigh = null;
let celsiusLow = null;  

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link"); 
celsiusLink.addEventListener("click", displayCelsius);

search("Christchurch");
displayForecast(); 
