// This is code for the Weather Dashboard application.
// =========================================================

console.log("hello world");
// function that gets relevant city data from the Openweather API
function getCityData(city) {}
// function that displays weather data on the browser
function displayCityWeather(response, uvResponse) {
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
}
// Grabs the data for the city that is submitted in the form
$("#search-form").on("submit", function(event) {
  event.preventDefault();
  var city = $("#city-search").val();
  baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
  var cityTerm = city + "&";
  apiKey = "appid=32f3bd91176f3143f734153b8e41357e";
  var queryUrl = baseUrl + cityTerm + apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(weatherResponse) {
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
      displayCityWeather(weatherResponse, uvResponse);
    });
  });
  weekUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=";
  forecastUrl = weekUrl + cityTerm + apiKey;
  $.ajax({
    url: forecastUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
});
