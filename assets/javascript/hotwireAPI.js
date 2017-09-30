/*
Variable Naming Notes:
g = global (example: gDatabase)
p = parameter
t = temporary (example: tUUID)
 */

function hotwireAPI (pStart, pEnd, pRegion) {
    var apiKey = 'krhcyf9u4tptfayz7zq26r4k';

    var hotwireURL = 'http://api.hotwire.com/v1/tripstarter/hotel'
        +'?apikey='+ apiKey
        +'&startdate='+ pStart
        +'&enddate='+ pEnd
        +'&travelseason=low&format=JSON&limit=10';

    var callHotwire = $.ajax({url: hotwireURL, method: 'GET'});
    callHotwire.done(init);
}

function init (response) {
    var cities = response.data;
}

function parseHotwire (){

}