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
function hotwireAPI (pStart, pEnd, pRegion) {
    var startDate = convertDateHotwire(pStart);
    var endDate = convertDateHotwire(pEnd);
    var apiKey = 'krhcyf9u4tptfayz7zq26r4k';

    var hotwireURL = 'http://api.hotwire.com/v1/tripstarter/hotel?format=JSON'
        +'&apikey='+ apiKey
        +'&startdate='+ startDate
        +'&enddate='+ endDate
        +'&travelseason=low&limit=10';

    $.ajax({
        url: hotwireURL,
        method: 'GET'
    }).done(
        parseHotwire(response, pRegion)
    ).fail( function (err) {
        console.log('ajax err: ' + err);
    });
}

/*
Function to parse the received response from the Hotwire API

Parameters: pResponse (JSON response), pRegion (domestic vs international)
Returns:
 */
function parseHotwire (pResponse, pRegion) {
    var cities = pResponse.data;
    console.log('Hotwire Response: ' + cities);
}

/*
Function to convert the date from date input to the required MM/DD/YYYY format

Parameters: pDate (date string YYYY-MM-DD)
Returns: date string (MM/DD/YYYY)
 */
function convertDateHotwire(pDate) {
    // create the arrays, split at the hyphen (-)
    var dateArray = pDate.split('-');
    return dateArray[1]+'/'+dateArray[2]+'/'+dateArray[0]
}