// This is code for the Weather Dashboard application.

console.log("hello world");
//

queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&";
apiKey = "appid=32f3bd91176f3143f734153b8e41357e";
$.ajax({
  url: queryUrl + apiKey,
  method: "GET"
}).then(function(response) {
  console.log(response);
});
