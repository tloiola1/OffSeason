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
                    if (response) { resolve(response); }
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
    var tStartDate = moment(pStartDate, "MM/DD/YYYY");
    var tEndDate = moment(pEndDate, "MM/DD/YYYY");
    var tToday = moment();

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
            return desiredArray;

        // if the region is domestic, remove all non-US based destinations
        case 'domestic':
            for (var j = 0; j < tLocationsArray.length; j++) {
                var location = tLocationsArray[j];
                if (location['DestinationCountryCode'] === 'US') {
                    desiredArray.push(location)
                }
            }
            // slice down to 15 results and return
            desiredArray = desiredArray.slice(0,15);
            return desiredArray;

        // catch all
        default:
            console.log('invalid');
            break;
    }
}
