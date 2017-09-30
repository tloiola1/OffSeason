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

// hide the cards results div
$("#card-wrapper").hide();

// on-click function for the Domestic button
$('#domestic').on('click', function (event) {
    event.preventDefault();

    // pull the values
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
    var regionPicked = 'domestic';

    console.log(startDate);
    console.log(endDate);

    // summon hotwireAPI from hotwireAPI.js
    // pass the start, end, and region
    hotwireAPI(startDate, endDate, regionPicked);

    // show the cards results div
    // scroll slowly to show the div
    $("#card-wrapper").show();
    $('html, body').animate({
        scrollTop: $('#card-wrapper').offset().top}, 'slow');
});

// on-click function for the International button
$('#international').on('click', function (event) {
    event.preventDefault();

    // pull the values
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
    var regionPicked = 'international';

    // summon hotwireAPI from hotwireAPI.js
    // pass the start, end, and region
    hotwireAPI(startDate, endDate, regionPicked);

    // show the cards results div
    // scroll slowly to show the div
    $("#card-wrapper").show();
    $('html, body').animate({
        scrollTop: $('#card-wrapper').offset().top}, 'slow');
});

$('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true
});