$(document).ready(function () {
  const listOfCities = [];
  $("#test-button").on("click", () => {
    if ($("#search-bar").val() == "") {
      alert("Enter city");
    }
    var inputCity = $("#search-bar").val();
    listOfCities.push(inputCity);
    currentWeatherData(inputCity);
    fiveDayForecast(inputCity);
    renderButtons();
    $("#search-bar").val("");
  });
  function renderButtons() {
    $("#previous-searches").empty();
    listOfCities.forEach(function (city) {
      var newRow = $("<button>")
        .addClass("new-added-row cityButton")
        .text(city)
        .click(function (event) {
          currentWeatherData($(event.target).text());
        });
      $("#previous-searches").append(newRow);
    });
  }
  function currentWeatherData(inputCity) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        inputCity +
        "&appid=402675f96bde8ad047ff5b58066a0e0a&units=imperial"
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        $("#today-forecast").empty();
        var todayForecast = $("#today-forecast");
        var titleEl = document.createElement("h2");
        titleEl.textContent = data.name;
        var temperatureEl = document.createElement("h4");
        temperatureEl.textContent = "Temperature: " + data.main.temp + "°F";
        var humidityEl = document.createElement("h4");
        humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
        var windSpeedEl = document.createElement("h4");
        windSpeedEl.textContent = "Wind speed: " + data.wind.speed + " MPH";
        todayForecast.append(titleEl);
        todayForecast.append(temperatureEl);
        todayForecast.append(humidityEl);
        todayForecast.append(windSpeedEl);
      });
  }
  function fiveDayForecast(inputCity) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        inputCity +
        "&appid=402675f96bde8ad047ff5b58066a0e0a&units=imperial"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var fiveDayForecast = $("#five-day-forecast");
        console.log(data);
        var seen = {};
        var results = [];
        for (i = 0; i < data.list.length; i++) {
          var current = data.list[i];
          var currentDate = current.dt_txt.split(" ")[0];
          if (seen[currentDate] === undefined) {
            results.push(current);
            seen[currentDate] = true;
          }
          if (results.length === 5) {
            break;
          }
        }
        var temp = results[0].main.temp;
        var humidity = results[0].main.humidity;
        var currentDate = current.dt_txt.split(" ")[0];
        fiveDayForecast.empty();
        var image = $("<img>");
        image.attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            results[0].weather[0].icon +
            "@2x.png"
        );
        var html = `
          <div class="card" style="width: 18rem;">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${currentDate}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
          `;
        fiveDayForecast.append(html);
      });
  }
});

var temp = results[0].main.temp
            var humidity = results[0].main.humidity
            var currentDate = current.dt_txt.split(" ")[0]
            fiveDayForecast.empty();
            
            
            
            var image = $('<img>');
            image.attr('src', 'http://openweathermap.org/img/wn/' + results[0].weather[0].icon + '@2x.png')
            
            var html = `
            <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${currentDate}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
            `
            fiveDayForecast.append(html);

