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
    var startDate = convertDateHotwire(pStart);
    var endDate = convertDateHotwire(pEnd);
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
            var tData = parseHotwire(response, pRegion);
            buildCards(tData);
        });
}

/*
Function to convert the date from date input to the required MM/DD/YYYY format

Parameters: pDate (date string "DD MonthName, YYYY")
Returns: date string ("MM/DD/YYYY")
 */
function convertDateHotwire(pDate) {
    var rightNow = moment();
    var targetDate = moment(pDate).format('MM/DD/YYYY');

    console.log(rightNow);
    console.log(targetDate);
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
    return pData;
}