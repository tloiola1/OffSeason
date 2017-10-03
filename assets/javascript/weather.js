
function cityWeather () {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cities + '&APPID=c29d220ad91825204d613bb66ea4cbdf&cnt=16';
    var weatherQuery = $.ajax({url: queryURL, method: 'Get'})
    weatherQuery.done(
        function (response) {
            weatherData = response;
        })

    console.log('???'+ weatherQuery);

};

function appendWeather(weatherData) {

    $('#weatherDiv').append(weatherData);
    
}


