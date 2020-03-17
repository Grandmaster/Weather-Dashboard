// This is code for the Weather Dashboard application.

console.log("hello world");
// Grabs the data for the city that is submitted in the form
$("#search-form").on("submit", function(event) {
  event.preventDefault();
  var city = $("#city-search").val();
  baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  var cityTerm = city + "&";
  apiKey = "appid=32f3bd91176f3143f734153b8e41357e";
  var queryUrl = baseUrl + cityTerm + apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
});
