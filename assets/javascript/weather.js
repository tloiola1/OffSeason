// var userCity = 'Orlando';
// var countryCode = '';

//runs function to grab weather for user selected city
// $(document).on('click', '#cityImg', cityWeather);
//query hotwire API call


// userCity = $('#').val().trim();
// var newChar = $('#user-character').val();

function cityWeather (location) {
	console.log("This is "+location);
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location + '&APPID=c29d220ad91825204d613bb66ea4cbdf&type=hour&start=1369728000&end=1369789200&cnt=6';
    $.ajax({
    	url: queryURL, 
    	method: 'Get'
    }).done(function(response){;

    console.log(response);
});
}
