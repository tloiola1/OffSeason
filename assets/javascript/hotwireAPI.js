
/*
Variable Naming Notes:
g = global (example: gDatabase)
p = parameter
t = temporary (example: tUUID)
 */

/*
Function to make AJAX call to Hotwire API
Parameters: pStart (start date MM/DD/YYYY), pEnd (end date MM/DD/YYYY), pRegion (domestic vs international
Returns: none
 */
var callHotwireAPI = function(pStart, pEnd) {
    return new Promise(
        function (resolve, reject) {
            //set the API key
            var apiKey = 'krhcyf9u4tptfayz7zq26r4k';

            // create the API Query URL
            var hotwireURL = 'https://gtproxy2.herokuapp.com/api/hotwire/v1/tripstarter/hotel?format=JSON'
                +'&apikey='+ apiKey
                +'&startdate='+ pStart
                +'&enddate='+ pEnd
                +'&travelseason=low&limit=';

            // create the AJAX call to the Hotwire API
            return $.ajax({
                url: hotwireURL,
                method: 'GET'
            }).done(
                function (response) {
                    if (response) { console.log(response); resolve(response); }
                    else {reject('Hotwire API Failed')}
                });
        });
};


/*
Function to convert the date from date input to the required MM/DD/YYYY format
Parameters: pDate (date string "DD MonthName, YYYY")
Returns: date string ("MM/DD/YYYY")
 */
function convertDateHotwire(pStartDate, pEndDate) {
    var tStartDate = moment(pStartDate, "DD MMMM, YYYY");
    var tEndDate = moment(pEndDate, "DD MMMM, YYYY");
    var tToday = moment().format("MM/DD/YYYY");

    // Create years difference between future date and today's date
    var dateDiff = tEndDate.diff(tToday, 'years');

    // Add one year to date difference. This will be use to subtract in next step
    var dateDiffPlus = dateDiff + 1;

    // Subtract dateDiff + 1 year from travelDate to get one year old date
    var pastDate1 = moment(tStartDate).subtract(dateDiffPlus, 'years').format("MM/DD/YYYY");
    var pastDate2 = moment(tEndDate).subtract(dateDiffPlus, 'years').format("MM/DD/YYYY");

    // return date array
    return [pastDate1, pastDate2];
}

/*
Function to parse the received response from the Hotwire API
Parameters: pResponse (JSON response), pRegion (domestic vs international)
Returns: JSON Object that is contains only what we need and is easier to navigate
 */
function parseHotwire (response, pRegion) {
    // get the results from the response
    // results is an array of objects, each of which is a destination
    var tLocationsArray = response['Result'];
    var desiredArray = [];

    switch (pRegion) {
        // if the region is international, remove all US based destinations
        case 'international':
            for (var i = 0; i < tLocationsArray.length; i++) {
                var location = tLocationsArray[i];
                if (location['DestinationCountryCode'] !== 'US') {
                    desiredArray.push(location);
                }
            }
            // slice down to 15 results and return
            desiredArray = desiredArray.slice(0,15);
            console.log('international parsed array:');
            console.log(desiredArray);
            return desiredArray;

        // if the region is domestic, remove all non-US based destinations
        case 'domestic':
            console.log('you clicked domestic');
            for (var j = 0; j < tLocationsArray.length; j++) {
                var location = tLocationsArray[j];
                if (location['DestinationCountryCode'] === 'US') {
                    desiredArray.push(location)
                }
            }
            // slice down to 15 results and return
            desiredArray = desiredArray.slice(0,15);
            console.log('domestic parsed array:');
            console.log(desiredArray);
            return desiredArray;

        // catch all
        default:
            console.log('invalid muthafucka');
            break;
    }
}

/*
Build the cards and append them to the #result-cards
 */
function buildCards(pData) {

    // For loop to test multiple cards getting made
    for (var i = 0; i < pData.length; i++) {
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
            .attr('src', '');
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

        //  Build the Card Reveal Section
        for (var i = 0; i < pData.length; i++) {
            var location = pData[i];
            location.AverageMaxTemp
            var maxTemp = location.AverageMaxTemp;
            console.log(maxTemp);

        }

        for (var i = 0; i < pData.length; i++) {
            var location = pData[i];
            location.AverageMinTemp
            var minTemp = location.AverageMinTemp;
            console.log(minTemp);

        }

        for (var i = 0; i < pData.length; i++) {
            var location = pData[i];
            location.AveragePrecipitationInches
            var precip = location.AveragePrecipitationInches;
            console.log(precip);

        }

        for (var i = 0; i < pData.length; i++) {
            var location = pData[i];
            location.YearOverYearChange
            var change = location.YearOverYearChange;
            console.log(change);

        }

        var titleSpan = $('<span>')
            .addClass('card-title grey-text text-darken-4')
            .append('<i class="material-icons right">close</i>');
        var weatherTitle = $('<p>Weather Forcast</p>');
        var weatherDiv = $('<div>')
            .addClass('weather')
            .append($('<div>').text(maxTemp))
            .append($('<div>').text(minTemp))
            .append($('<div>').text(precip))
            .append($('<div>').text('Year over year price change' + change));

        // append it all to the RevealDiv and then to the new Card
        cardRevealDiv
            .append(titleSpan)
            .append(weatherTitle)
            .append(weatherDiv);
        newCard.append(cardRevealDiv);

        // finally add the new Card to the DOM by appending it to the Results Div
        $('#result-cards').append(newCard);
    }
}