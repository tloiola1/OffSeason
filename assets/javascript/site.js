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

// on-click function for the Domestic button
$('#domestic').on('click', function (event) {
    event.preventDefault();

    // pull the values
    var userStart = $('#start-date').val();
    var userEnd = $('#end-date').val();
    var regionPicked = 'domestic';

    // convert the dates using convertDateHotwire from hotwireAPI.js
    var convertedDates = convertDateHotwire(userStart, userEnd);
    var startDate = convertedDates[0];
    var endDate = convertedDates[1];

    // clear out old results
    $('#result-cards').empty();

    // summon hotwireAPI from hotwireAPI.js
    // pass the start, end, and region
    callHotwireAPI(startDate, endDate)
        .then(response => parseHotwire(response, regionPicked))
        .then(response => callImageAPI(response));
});

// on-click function for the International button
$('#international').on('click', function (event) {
    event.preventDefault();

    // pull the values
    var userStart = $('#start-date').val();
    var userEnd = $('#end-date').val();
    var regionPicked = 'international';

    // convert the dates using convertDateHotwire from hotwireAPI.js
    var convertedDates = convertDateHotwire(userStart, userEnd);
    var startDate = convertedDates[0];
    var endDate = convertedDates[1];

    // clear out old results
    $('#result-cards').empty();

    // summon hotwireAPI from hotwireAPI.js
    // pass the start, end, and region
    callHotwireAPI(startDate, endDate)
        .then(response => parseHotwire(response, regionPicked))
        .then(response => callImageAPI(response));
});

// handle the calendars on the landing page
$('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true
});