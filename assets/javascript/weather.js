// for each city make a call for the weather
// then add it to the {object} (pCities[i])
// then pass that {object}  to imgAPI
// imgAPI gets the img link and adds to {object}
// Build the damn thing and append it
// animate that bitch
// ???
// PROFIT

// pCities is a parameter passed to cityWeather from hotWireAPI after the hotwire response is parsed

function cityWeather (pCities) {

    for (var i = 0; i < pCities; i++) {

        var queryURL = 'http://api.openweathermap.org/data/2.5/history/city?q=' + pCities + '&APPID=c29d220ad91825204d613bb66ea4cbdf&cnt=16';
        var weatherQuery = $.ajax({url: queryURL, method: 'Get'})
        weatherQuery.done(
            function (response) {
                weatherData = response;
            });

        console.log('???' + weatherQuery);
    };
}


function appendWeather(weatherData) {

    $('#weatherDiv').append(weatherData);
    
}


