var userCity = 'Orlando';
var countryCode = '';

//runs function to grab weather for user selected city
$(document).on('click', '#cityImg', cityWeather);
//query hotwire API call


userCity = $('#').val().trim();
var newChar = $('#user-character').val();
function cityWeather () {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + userCity + '&APPID=c29d220ad91825204d613bb66ea4cbdf&cnt=16';
    var weatherQuery = $.ajax({url: queryURL, method: 'Get'})
    weatherQuery.done();
    console.log('???'+ weatherQuery);
};