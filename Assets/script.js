// This is code for the Weather Dashboard application.
// =========================================================

console.log("hello world");
// Variables to store the relevant city data
var globalWeatherResponse;
var globalUvResponse;
var globalForecastResponse;
// function that gets relevant city data from the Openweather API
function getCityData(city) {
  baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
  var cityTerm = city + "&";
  apiKey = "appid=32f3bd91176f3143f734153b8e41357e";
  var queryUrl = baseUrl + cityTerm + apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(weatherResponse) {
    weekUrl =
      "https://api.openweathermap.org/data/2.5/forecast?units=imperial&cnt=50&q=";
    forecastUrl = weekUrl + cityTerm + apiKey;
    $.ajax({
      url: forecastUrl,
      method: "GET"
    }).then(function(forecastResponse) {
      uvUrl = "https://api.openweathermap.org/data/2.5/uvi?";
      var uvQueryUrl =
        uvUrl +
        apiKey +
        "&lat=" +
        weatherResponse.coord.lat +
        "&lon=" +
        weatherResponse.coord.lon;
      $.ajax({
        url: uvQueryUrl,
        method: "GET"
      }).then(function(uvResponse) {
        displayCityWeather(weatherResponse, uvResponse, forecastResponse);
        console.log(forecastResponse);
      });
    });
  });
}
// function that displays weather data on the browser
function displayCityWeather(response, uvResponse, forecastResponse) {
  $("#city-data > p").remove();
  var weatherIcon = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
  );
  $("#city-name").text(response.name);
  $("#city-name").append(weatherIcon);
  var temp = $("<p>").text("Temperature: " + response.main.temp + "\xB0F");
  var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
  var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
  var uvIndex = $("<p>").text("UV Index: " + uvResponse.value);
  $("#city-data").append(temp);
  $("#city-data").append(humidity);
  $("#city-data").append(windSpeed);
  $("#city-data").append(uvIndex);
  var arr = [];
  for (let i of forecastResponse.list) {
    if (/12:00:00/.test(i.dt_txt)) {
      var forecastDiv = $("<div>").addClass("card");
      forecastDiv.append(
        $("<h5>")
          .addClass("card-title")
          .text("Option")
      );
      var cardColumn = $("<div>").addClass("col-sm-2");
      cardColumn.append(forecastDiv);
      $("#forecast-list").append(cardColumn);
      arr.push(i);
    }
  }
  console.log(arr);
}
// Grabs the data for the city that is submitted in the form
$("#search-form").on("submit", function(event) {
  event.preventDefault();
  var city = $("#city-search").val();
  getCityData(city);
  console.log(moment("2020-03-17").format("MMMM Do YYYY"));
});
