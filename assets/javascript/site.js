/*
Variable Naming Notes:
g = global (example: gDatabase)
p = parameter
t = temporary (example: tUUID)
 */

// ------------------------------------------------
//                  ON PAGE LOAD
// ------------------------------------------------

// obtain userID cookie and set up global data object
var gUserCookie = setUserCookie();
var gUUID = gUserCookie.uuid;

// on-click function for the Go button
$('#search-button').on('click', function (event) {
    event.preventDefault();

    // pull the values
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
    var regionPicked = $('#region option:selected').val();

    // summon hotwireAPI from hotwireAPI.js
    // pass the start, end, and region
    hotwireAPI(startDate, endDate, regionPicked);
});