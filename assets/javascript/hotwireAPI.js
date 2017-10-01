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
    // var startDate = convertDateHotwire(pStart);
    // var endDate = convertDateHotwire(pEnd);
    var startDate = '12/05/2016';
    var endDate = '12/15/2016';
    var apiKey = 'krhcyf9u4tptfayz7zq26r4k';

    // 'https://gtproxy2.herokuapp.com/api/hotwire/v1/tripstarter/hotel?format=JSON'
    var hotwireURL = 'https://gtproxy2.herokuapp.com/api/hotwire/v1/tripstarter/hotel?format=JSON'
        +'&apikey='+ apiKey
        +'&startdate='+ startDate
        +'&enddate='+ endDate
        +'&travelseason=low';
    console.log(hotwireURL);

    $.ajax({
        url: hotwireURL,
        method: 'GET'
    }).done(
        function (response) {
            console.log(response);
            parseHotwire(response, pRegion);
        });
}

/*
Function to parse the received response from the Hotwire API

Parameters: pResponse (JSON response), pRegion (domestic vs international)
Returns:
 */
function parseHotwire (pResponse, pRegion) {
    var tLocationsArray = pResponse['Result'];
    console.log(tLocationsArray);
    console.log(tLocationsArray[0]);
    console.log(tLocationsArray[0]['DestinationCity']);
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