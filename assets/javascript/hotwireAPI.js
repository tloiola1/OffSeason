
/*
Variable Naming Notes:
g = global (example: gDatabase)
p = parameter
t = temporary (example: tUUID)
 */

// Sean's API key: p4j4vytm588y332gdt8r79cp

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
          var tLocationsArray = response['Result'];

            if (pRegion === 'international') {
                for (var i = 0; i < tLocationsArray.length; i++) {
                    var location = tLocationsArray[i];
                    location.DestinationCountryCode
                    if (location.DestinationCountryCode === 'US') {
                        tLocationsArray.splice(i, 1);
                    }
                }
            }

            else {

                for (var i = 0; i < tLocationsArray.length; i++) {
                    var location = tLocationsArray[i];
                    location.DestinationCountryCode
                    if (location.DestinationCountryCode !== 'US') {
                        tLocationsArray.splice(i, 1);
                    }
                }
            }


            // tLocationArray = [{Object}, {Object}, {Object}]
            cityWeather(tLocationsArray);
            var tData = parseHotwire(response, pRegion);
            buildCards(tLocationsArray);
            moveAnimation();
        });
}


/*
Function to convert the date from date input to the required MM/DD/YYYY format
Parameters: pDate (date string "DD MonthName, YYYY")
Returns: date string ("MM/DD/YYYY")
 */
function convertDateHotwire(pStartDate, pEndDate) {
    var startDate = moment(pStartDate, "DD MMMM, YYYY");
    var endDate = moment(pEndDate, "DD MMMM, YYYY");
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
    imgAPI(tLocationsArray[0]['DestinationCity']).then(function(results) {
        console.log(results);
        cardImage = results.hits[0].webformatURL;
        console.log('THIS IScardIMAGE  ' + cardImage);
        tLocationsArray[0]['cardImage'] =  cardImage;
        console.log('THIS IS WHAT WE WANT   ' + tLocationsArray[0]['cardImage']);
    })
    // getting the weather
    cityWeather(tLocationsArray[0]['DestinationCity']);

    //append city destination to browser
    $(".card-title").html(tLocationsArray[0]['DestinationCity'])

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
            .attr('src', cardImage);
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