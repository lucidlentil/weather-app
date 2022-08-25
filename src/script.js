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


//Not working :( will update after watching solution - Add a Current Location button. When clicking it, it should use the geolocation API to get your GPS coordinates and display the city and current temperature using the OpenWeather API
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

let celsiusHigh = null;
let celsiusLow = null;  

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link"); 
celsiusLink.addEventListener("click", displayCelsius);

search("Christchurch");

//Conversion back to celsius to be added

//let weather = {
//  paris: {
//    temp: 19.7,
//  humidity: 80
//  },
//  tokyo: {
//    temp: 17.3,
//    humidity: 50
//  },
//  lisbon: {
//    temp: 30.2,
//    humidity: 20
//  },
//  "san francisco": {
//    temp: 20.9,
//    humidity: 100
//  },
//  oslo: {
//    temp: -5,
//    humidity: 20
//  }
//};
//function whatCity() {
//    let city = prompt("Enter a city");
//    city = city.trim();
//    city = city.toLowerCase();
//    if (weather[city] !== undefined) {
//        alert(`It is currently ${Math.round(weather[city].temp)}°C (${Math.round(weather[city].temp * 1.8 + 32)})°F in ${city} with a humidity level of ${weather[city].humidity}%`);
//    } else {
//        alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather`)
//    }
//}
//whatCity();
