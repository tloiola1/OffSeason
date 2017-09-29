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

$('#search-button').on('click', function (event) {
    event.preventDefault();

    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
    var regionPicked = $('#region option:selected').val();

    hotwireAPI(startDate, endDate, regionPicked);
});