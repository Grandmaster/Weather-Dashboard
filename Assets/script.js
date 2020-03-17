// This is code for the Weather Dashboard application.
// =========================================================

console.log("hello world");
// function that displays weather data on the browser
function displayCityWeather(response) {
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
  $("#city-data").append(temp);
  $("#city-data").append(humidity);
  $("#city-data").append(windSpeed);
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
  }).then(function(response) {
    console.log(response);
    displayCityWeather(response);
  });
});
