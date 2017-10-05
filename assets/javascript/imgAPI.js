
function callImageAPI (response) {
    console.log('starting callImageAPI');
    console.log('using below response:');
    console.log(response);

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
            console.log('promises all done, imageStack below:');
            console.log(imageStack);
            for (var k = 0; k < imageStack.length; k++) {
                var target = imageStack[k].responseJSON;
                console.log('target below:');
                console.log(target);
                console.log(target.hits[0].webformatURL);
                response[k]['imageURL'] = target.hits[0].webformatURL;
                console.log(response[k])
            }
            console.log('the promises loop is done, new complete response below');
            console.log(response);
    });
}

// function to clean the input string
function removeBad (pString) {
    return pString.replace(/ *\([^)]*\) */g, "");
}