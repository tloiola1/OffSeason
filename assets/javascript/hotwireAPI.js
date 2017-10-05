/*
Variable Naming Notes:
g = global (example: gDatabase)
p = parameter
t = temporary (example: tUUID)
 */

// Sean's API key: p4j4vytm588y332gdt8r79cp

// jQuery datepicker with past dates disable functionality
$(document).ready(function() {
    $('#start-date').datepicker({
        showAnim: 'drop',
        minDate: 0,
        maxDate: "+11M",
        numberOfMonths: 2,
        onClose: function(selectedDate){
            $('#end-date').datepicker("option", "minDate",selectedDate);
        }
    });
    $('#end-date').datepicker({
        showAnim: 'drop',
        minDate: 0,
        maxDate: "+11M",
        numberOfMonths: 2
    });
});

/*
Function to make AJAX call to Hotwire API

Parameters: pStart (start date MM/DD/YYYY), pEnd (end date MM/DD/YYYY), pRegion (domestic vs international
Returns: none
 */
function hotwireAPI (pStart, pEnd, pRegion) {
    var convertedDates = convertDateHotwire(pStart, pEnd);
    var startDate = convertedDates[0];
    var endDate = convertedDates[1];
    var apiKey = 'krhcyf9u4tptfayz7zq26r4k';

    var hotwireURL = 'https://gtproxy2.herokuapp.com/api/hotwire/v1/tripstarter/hotel?format=JSON'
        +'&apikey='+ apiKey
        +'&startdate='+ startDate
        +'&enddate='+ endDate
        +'&travelseason=low&limit=';

    console.log(hotwireURL);

    $.ajax({
        url: hotwireURL,
        method: 'GET'
    }).done(
        function (response) {
            console.log(response);
            // var tData = parseHotwire(response, pRegion);
            buildCards('dummy data');
            moveAnimation();
        });
}


/*
Function to convert the date from date input to the required MM/DD/YYYY format

Parameters: pDate (date string "DD MonthName, YYYY")
Returns: date string ("MM/DD/YYYY")
 */
function convertDateHotwire(pStartDate, pEndDate) {
    var startDate = moment(pStartDate);
    var endDate = moment(pEndDate);
    var today = moment().format("MM/DD/YYYY");

    // Create years difference between future date and today's date
    var dateDiff = endDate.diff(today, 'years');

    // Add one year to date difference. This will be use to subtract in next step
    var dateDiffPlus = dateDiff + 1;

    // Subtract dateDiff + 1 year from travelDate to get one year old date
    var pastDate1 = moment(startDate).subtract(dateDiffPlus, 'years').calendar("MM/DD/YYYY");
    var pastDate2 = moment(endDate).subtract(dateDiffPlus, 'years').calendar("MM/DD/YYYY");

    // return date array
    return [pastDate1, pastDate2];
}

/*
Function to parse the received response from the Hotwire API

Parameters: pResponse (JSON response), pRegion (domestic vs international)
Returns: JSON Object that is contains only what we need and is easier to navigate
 */
function parseHotwire (pResponse, pRegion) {
    var tLocationsArray = pResponse['Result'];
    console.log(tLocationsArray);
    console.log(tLocationsArray[0]);
    console.log(tLocationsArray[0]['DestinationCity']);
    
    // This line send the city name to destination image to get image to show on browser. Tarciso.
    destinationImage(tLocationsArray[0]['DestinationCity']);

    // getting the weather
    cityWeather(tLocationsArray[0]['DestinationCity']);

    //append city destination to browser
    $(".card-title").html(tLocationsArray[0]['DestinationCity'])

    var tCleanedData = {
        blank: 'blank object for testing'
    };

    return tCleanedData;
}

/*
Build the cards and append them to the #result-cards
 */
function buildCards(pData) {
    // For loop to test multiple cards getting made
    for (var i = 0; i < 7; i++) {
        // create the new Card wrapper
        var newCard = $('<div>');
        newCard.addClass('card sticky-action is-moved');

        // define subsections of the Card
        var cardImageDiv = $('<div>').addClass('card-image waves-effect waves-block waves-light');
        var cardActionDiv = $('<div>').addClass('card-action');
        var cardRevealDiv = $('<div>').addClass('card-reveal');

        // Build the Card Image Section
        var cardImgImg = $('<img>')
            .addClass('activator')
            .attr('src', 'assets/images/atl1.jpg');
        // append the Image Div then append it all to the new Card
        cardImageDiv.append(cardImgImg);
        newCard.append(cardImageDiv);

        // Build the Card Action Section
        var cityTitle = $('<span>')
            .addClass('card-title grey-text text-darken-4')
            .text('CITY NAME VAR');
        var actionButton = $('<button>')
            .addClass('activator btn-floating waves-effect waves-light red right')
            .append('<i class="material-icons">add</i>');
        var priceText = $('<p>')
            .text('price var');
        var hotLink = $('<p>')
            .append('<a href="https://www.hotwire.com/" target="_blank">LINK VAR</a>');
        // append all the sections to the ActionDiv then to the new Card
        cardActionDiv
            .append(cityTitle)
            .append(actionButton)
            .append(priceText)
            .append(hotLink);
        newCard.append(cardActionDiv);

        // Build the Card Reveal Section
        var titleSpan = $('<span>')
            .addClass('card-title grey-text text-darken-4')
            .append('<i class="material-icons right">close</i>');
        var weatherTitle = $('<p>Weather Forcast</p>');
        var weatherDiv = $('<div>')
            .addClass('weather')
            .text('THIS IS WHERE THE WEATHER WILL GO');
        // append it all to the RevealDiv and then to the new Card
        cardRevealDiv
            .append(titleSpan)
            .append(weatherTitle)
            .append(weatherDiv);
        newCard.append(cardRevealDiv);

        console.log(newCard);

        // finally add the new Card to the DOM by appending it to the Results Div
        $('#result-cards').append(newCard);
    }
}