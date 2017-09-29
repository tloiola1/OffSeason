/*
Variable Naming Notes:
g = global (example: gDatabase)
p = parameter
t = temporary (example: tUUID)
 */


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCsjGYYpplHoLB2Je-ZusAXR_5_yWMWdDk",
    authDomain: "offseason-gtcbc-project.firebaseapp.com",
    databaseURL: "https://offseason-gtcbc-project.firebaseio.com",
    projectId: "offseason-gtcbc-project",
    storageBucket: "offseason-gtcbc-project.appspot.com",
    messagingSenderId: "978254533890"
};
firebase.initializeApp(config);

var gDatabase = firebase.database();
var userCity = 'Orlando';
var countryCode = '';

/*
Generates UUID based on the current Date / performance clock
Allows for unique user entry into Firebase
Pulled from:
    https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472

Parameters: none
Returns: string (the UUID)
 */
function generateUUID () { // Public Domain/MIT
    var d = new Date().getTime();

    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
}

/*
Function called on page load to either retrieve the cookie or create one

Parameters: none
Returns: string (the cookie)
 */
function setUserCookie () {
    // check if a cookie already exists in the browser
    // getter
    if (document.cookie) {
        return document.cookie;
    }
    // if it doesn't then make one
    // setter
    else {
        var tUUID = generateUUID();
        document.cookie = `uuid=${tUUID};`;
        return document.cookie;
    }
}

/*
Write to the user's DB entry

Parameters: pCookie (the userID cookie), pData (JSON object of data)
 */
function setUserData (pCookie, pData) {

}

// ------------------------------------------------
//                  ON PAGE LOAD
// ------------------------------------------------

// obtain userID cookie
var gUserCookie = setUserCookie();





//runs function to grab weather for user selected city

$(document).on('click', '#cityImg', cityWeather);

 userCity = $('#').val().trim();

function cityWeather () {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + userCity + '&APPID=c29d220ad91825204d613bb66ea4cbdf&cnt=16';
    var weatherQuery = $.ajax({url: queryURL, method: 'Get'})
    weatherQuery.done();
    console.log('???'+ weatherQuery);
};

