// This is code for the Weather Dashboard application.
// =========================================================

console.log("hello world");
// Variables to store the relevant city data in local storage
var weatherData = {};
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
  $("#city-name").text(response.name + " (" + moment().format("M/D/Y") + ")");
  $("#city-name").append(weatherIcon);
  var temp = $("<p>").text("Temperature: " + response.main.temp + "\xB0F");
  var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
  var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
  var uvIndex = $("<p>").text("UV Index: " + uvResponse.value);
  $("#city-data").append(temp);
  $("#city-data").append(humidity);
  $("#city-data").append(windSpeed);
  $("#city-data").append(uvIndex);
  // This part generates the cards
  $("#forecast-list").empty();
  for (let i of forecastResponse.list) {
    // Next line limits the # of results for each day
    if (/12:00:00/.test(i.dt_txt)) {
      var forecastDiv = $("<div>").addClass("card");
      var date = /^\d+-\d+-\d+/.exec(i.dt_txt)[0];
      var formattedDate = moment(date).format("M/D/Y");
      forecastDiv.append(
        $("<h5>")
          .addClass(
            "card-ti                                                                                                    tle"
          )
          .text(formattedDate)
      );
      forecastDiv.append(
        $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/" + i.weather[0].icon + ".png"
        )
      );
      forecastDiv.append(
        $("<p>").text("Temperature: " + i.main.temp + "\xB0F")
      );
      forecastDiv.append($("<p>").text("Humidity: " + i.main.humidity + "%"));
      var cardColumn = $("<div>").addClass("col-sm-2");
      cardColumn.append(forecastDiv);
      $("#forecast-list").append(cardColumn);
    }
  }
}
// Grabs the data for the city that is submitted in the form and displays it
// to the page
$("#search-form").on("submit", function(event) {
  event.preventDefault();
  var city = $("#city-search").val();
  getCityData(city);
  var buttonDiv = $("<div>").addClass("row");
  var buttonColumn = $("<div>").addClass("col-sm-12");
  buttonColumn.append(
    $("<button>")
      .addClass("btn btn-light")
      .text(city)
  );
  buttonDiv.append(buttonColumn);
  $("#search").append(buttonDiv);
  weatherData = Object.assign(weatherData, { city: "searched" });
  console.log(weatherData);
});
