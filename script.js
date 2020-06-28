$(document).ready(function() {
    const listOfCities = [];
    $("#test-button").on("click", () => {
        if ($("#search-bar").val() === "") {
            alert("Enter City");
            return 
    }
        var inputCity = $("#search-bar").val();
        listOfCities.push(inputCity);
        currentWeatherData(inputCity);
        weekWeather(inputCity);
        renderButtons();
        $("#search-bar").val("");
    });

    function renderButtons() {
        $("#previous-searches").empty()
        listOfCities.forEach(function (city) {
          var newRow = $("<button>").addClass("new-added-row cityButton").text(city).click(function(event){
            currentWeatherData($(event.target).text());
          });
          $("#previous-searches").append(newRow);
        });
      }

    function currentWeatherData(inputCity) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=58a08c2908ce32624719339921d6bfb5&units=imperial"   
    )
    .then(function (response) {
        return response.json();
    })  
    .then(function (data) {
        //Fetch UV Index info
        fetch(
            "http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}q=" + "&appid=58a08c2908ce32624719339921d6bfb5&units=imperial"   
        )
        .then(function (response) {
            return response.json();
            console.log(response)
        })

        var todaysForecast = $("#today-forecast");
        todaysForecast.empty();

        //var for today
        var titleEl = $("<h2>");
        var temperatureEl = $("<h4>");
        var humidityEl = $("<h4>");
        var windSpeedEl = $("<h4>");
        var uvIndexEl = $("<h4>");
        
        //creating elements
        titleEl.text(data.name);
        temperatureEl.text("Temperature: " + data.main.temp + " °F");
        humidityEl.text("Humidity: " + data.main.humidity + " %");
        windSpeedEl.text("Wind Speed: " + data.wind.speed + " MPH");
        uvIndexEl.text("UV Index: " + data.coord)
        var coordLat = data.coord.lat;
        var coordLon = data.coord.lon;

        
        //appending elements
        todaysForecast.append(titleEl);
        todaysForecast.append(temperatureEl);
        todaysForecast.append(humidityEl);
        todaysForecast.append(windSpeedEl);
        todaysForecast.append(uvIndexEl);

    });
    }

    function weekWeather(inputCity) {
        fetch (
            "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + 
            "&appid=58a08c2908ce32624719339921d6bfb5&units=imperial"
        )
        
        .then (function(response) {
            return response.json()
        })
        .then (function(data) {
            var fiveDayForecast = $("#five-day-forecast");
            var seen = {}
            var results = []
            for (i = 0; i < data.list.length; i++) {
                var current = data.list[i]
                var currentDate = current.dt_txt.split(" ")[0]
                if (seen [currentDate] === undefined) {
                    results.push(current)   
                    seen[currentDate] = true 
                }
                
                if (results.length === 5){
                    break
                }
                
            }
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
        })
        
    }

});