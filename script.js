$(document).ready(function() {
    const listOfCities = [];
    renderButtons();
    
    // if no city is entered, return an error message
    $("#test-button").on("click", () => {
        if ($("#search-bar").val() === "") {
            alert("Enter City");
            return 
    }
        var inputCity = $("#search-bar").val();
         //getting to local storage
            var cities = (localStorage.getItem("listOfCities"))
        //if not true set to an array
        if (!cities) {
            cities = []
        }
        else {
            //split the cities so local storage can read
            cities = cities.split(",")
        }
            if (cities.indexOf(inputCity) < 0 ) {
                cities.push(inputCity);
            }
            localStorage.setItem("listOfCities", cities)
                
            currentWeatherData(inputCity);
            weekWeather(inputCity);
            //clearing previous searches to not render it twice
            $("#previous-searches").empty()

            renderButtons();
            //clearing the search bar
            $("#search-bar").val("");
            
        });
        
        function renderButtons() {            
            var cities = (localStorage.getItem("listOfCities"))
            
            if (cities) {
                cities = cities.split(",")
                cities.forEach(function (inputCity) {
                    //adding cities to col on left to access without retyping it in
                    var newRow = $("<button>").addClass("new-added-row cityButton").text(inputCity).click(function(event){
                        currentWeatherData($(event.target).text());
                        weekWeather($(event.target).text())
                    });
                    $("#previous-searches").append(newRow);
                });
            }
            
        }

    function currentWeatherData(inputCity) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=58a08c2908ce32624719339921d6bfb5&units=imperial"   
            )
            .then(function (response) {
                return response.json();
            })  
            .then(function (data) {
                var coordLat = data.coord.lat;
                var coordLon = data.coord.lon;
            //Fetch UV Index info
            fetch(
                `https://api.openweathermap.org/data/2.5/uvi?appid=58a08c2908ce32624719339921d6bfb5&lat=${coordLat}&lon=${coordLon}`
            )
            .then(function (response) {
                return response.json();
            })
                .then(function (uvIndex) {          
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
                    uvIndexEl.text("UV Index: " + uvIndex.value)
                    
                    
                    //appending elements
                    todaysForecast.append(titleEl);
                    todaysForecast.append(temperatureEl);
                    todaysForecast.append(humidityEl);
                    todaysForecast.append(windSpeedEl);
                    todaysForecast.append(uvIndexEl);
                })

        });
    }

    function weekWeather(inputCity) {
        //fetch 5 day 3 hour weather api
        fetch (
            "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + 
            "&appid=58a08c2908ce32624719339921d6bfb5&units=imperial"
        )
        
        .then (function(response) {
            return response.json()
        })
        .then (function(data) {
            var fiveDayForecast = $("#five-day-forecast");
            fiveDayForecast.empty();
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
            for (i = 0; i < results.length; i++) {
                //info put into cards                 
                var temp = results[i].main.temp
                var humidity = results[i].main.humidity
                var currentDate = results[i].dt_txt.split(" ")[0]
                
                var image = 'http://openweathermap.org/img/wn/' + results[i].weather[0].icon + '@2x.png'
                
                var html = `
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title"> ${currentDate}</h5>
                <img src= "${image}" class="card-img-top" alt="weather icon">
                <h5 class=="card-text"> Temperature ${temp} </h5>
                <h5 class=="card-text"> Humidity ${humidity}</h5>
                </div>
                </div>
                `
                fiveDayForecast.append(html);
            }    
        })
    }
});