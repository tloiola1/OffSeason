/*
Build the cards and append them to the #result-cards

Parameters: list of objects with a lot of data
Returns: nothing
 */
function buildCards(pData) {
    /*
        {AverageMaxTemp: "73.0"
        AverageMinTemp: "52.0"
        AveragePrecipitationInches: "1.7"
        AveragePrice: "173.0"
        CurrencyCode: "USD"
        DestinationAirportCode: "MEX"
        DestinationCity: "Mexico City"
        DestinationCountryCode: "MX"
        DestinationLatitude: "19.436666"
        DestinationLongitude: "-99.07167"
        DestinationStateCode: "DF"
        Month: "10"
        Season: "low"
        Url: "http://www.hotwire.com/tripstarter/details.jsp?originAirportCode=SFO&destinationAirportCode=MEX&origCity=San+Francisco%2C+CA&destCity=Mexico+City%2CDF&showTab=hotel"
        WeatherAttribution: "WEATHER SOURCE: National Oceanic and Atmospheric Administration, National Climatic Data Center, Asheville, North Carolina"
        WeekStartDate: "10/23/2016"
        YearOverYearChange: "179.03226%"
        imageURL: "https://pixabay.com/get/eb32b1092ef4063ed95c4518b74a439eeb70e4d004b0144192f1c67ca0ecb5_640.jpg"
     */

    // For loop to cycle through all objects
    for (var i = 0; i < pData.length; i++) {

        // set current location
        var location = pData[i];

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
            .attr('src', location.imageURL);
        // append the Image Div then append it all to the new Card
        cardImageDiv.append(cardImgImg);
        newCard.append(cardImageDiv);

        // Build the Card Action Section
        var cityTitle = $('<span>')
            .addClass('card-title grey-text text-darken-4')
            .text(location.DestinationCity);
        var actionButton = $('<button>')
            .addClass('activator btn-floating waves-effect waves-light red right')
            .append('<i class="material-icons">add</i>');
        var priceText = $('<p>')
            .text('$' + location.AveragePrice);
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
        var maxTemp = location.AverageMaxTemp;
        var minTemp = location.AverageMinTemp;
        var precip = location.AveragePrecipitationInches;
        var change = location.YearOverYearChange;

        var titleSpan = $('<span>')
            .addClass('card-title grey-text text-darken-4')
            .append('<i class="material-icons right">close</i>');
        var weatherTitle = $('<p>Weather Forcast</p>');
        var weatherDiv = $('<div>')
            .addClass('weather')
            .append($('<div>').text('Max Temp: ' + maxTemp))
            .append($('<div>').text('Min Temp: ' + minTemp))
            .append($('<div>').text('Avg Precipitation: ' + precip))
            .append($('<div>').text('YOY Price Change: ' + change));

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