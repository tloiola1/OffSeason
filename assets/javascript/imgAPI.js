/*
Function to call and get the images for each location object.
Adds the imageURL to the object keys

Parameters: response array with Objects inside
Returns: nothing
 */
function callImageAPI (response) {

    // define API Key and empty promise array
    var imgApiKey = "6588765-767f2672757f4bf26b7229992";
    var imageStack = [];

    // loop through passed response
    for (var l = 0; l < response.length; l++) {
        // get city name from current response object
        var tCity = response[l]['DestinationCity'];
        tCity = removeBad(tCity);

        // build the query URL for the API
        var queryURL = "https://pixabay.com/api/?key="+ imgApiKey
            +"&q="+ tCity
            +"&image_type=photo";

        // add the AJAX call to the call stack
        imageStack.push(
            $.ajax({url: queryURL, method: "GET"})
        );
    }

    // create a Promise All that waits for all of the calls to get responses
    Promise.all(imageStack)
        .then(function() {
            // once they're all done pulling, loop through the responses
            // assign to the original objects as imageURL
            for (var k = 0; k < imageStack.length; k++) {
                var target = imageStack[k].responseJSON;

                // check for hits length to handle limited or no results
                if (target.hits.length > 0) {
                    // create max random number based on length
                    // can't exceed the highest array index
                    var maxRand = 1;
                    if (target.hits.length > 5) {
                        maxRand = 5;
                    }
                    else {
                        maxRand = target.hits.length;
                    }

                    // create the random index number for the images
                    var randImg = Math.floor((Math.random() * maxRand));

                    // set the imageURL
                    response[k]['imageURL'] = target.hits[randImg].webformatURL;
                }
                // if length is 0 use default image
                else {
                    response[k]['imageURL'] = 'assets/images/atl4.jpg';
                }
            }

            // call the card builder from cardBuilder.js
            buildCards(response);
            moveAnimation();
    });
}

// function to clean the input string
function removeBad (pString) {
    return pString.replace(/ *\([^)]*\) */g, "");
}