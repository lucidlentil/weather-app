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
function dateTime() {
  let currentDateTime = document.querySelector("#date-time");
  currentDateTime.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;
}
dateTime();

//Search button - when a user searches for a city, it should display the name of the city on the result page and the current temp of the city
let searchForm = document.querySelector("#search-form");
let enterCity = document.querySelector("#enter-city");
let cityName = document.querySelector("#city-name");
let todayHigh = document.querySelector(".todayHigh");
let todayLow = document.querySelector(".todayLow");

function getWeather(response) {
  console.log();
  todayHigh.innerHTML = Math.round(response.data.main.temp_max);
  todayLow.innerHTML = Math.round(response.data.main.temp_min);
}

function changeCity(event) {
  event.preventDefault();
  let city = enterCity.value;
  let units = "metric";
  let apiKey = "74ca054ff55e08af1a7a77572c080cfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  cityName.innerHTML = `${city}`;
  axios.get(apiUrl).then(getWeather);
}
searchForm.addEventListener("submit", changeCity);

//Not working :( will update after watching solution - Add a Current Location button. When clicking it, it should use the geolocation API to get your GPS coordinates and display the city and current temperature using the OpenWeather API
let locationButton = document.querySelector(".location-button");

function getLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let city = response.data.name;
  let unit = "metric";
  let apiKey = "74ca054ff55e08af1a7a77572c080cfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  cityName.innerHTML = `${city}`;
  axios.get(apiUrl).then(getWeather);
}
navigator.geolocation.getCurrentPosition(getLocation);
locationButton.addEventListener("click", getLocation);

//To farenheit:
let farenheitLink = document.querySelector("#farenheit");
function changeToFarenheit(event) {
  event.preventDefault();
  let tempHigh = todayHigh.innerHTML;
  let tempLow = todayLow.innerHTML;
  todayHigh.innerHTML = Math.round((tempHigh * 9) / 5 + 32);
  todayLow.innerHTML = Math.round((tempLow * 9) / 5 + 32);
}
farenheitLink.addEventListener("click", changeToFarenheit);

//Conversion back to celsius to be added
