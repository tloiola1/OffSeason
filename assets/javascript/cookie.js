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

// create global database variable
var gDatabase = firebase.database();

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
Returns: string (the cookie as stringified JSON)
 */
function setUserCookie () {
    // date for created or last visited
    var rightNow = new Date();

    // check if a cookie already exists in the browser
    // getter
    if (document.cookie) {
        // get UUID and update the lastVisit property of the user
        var tUUID = JSON.parse(document.cookie);
        updateUserData(tUUID.uuid, {lastVisit: rightNow});

        return JSON.parse(document.cookie);
    }
    // if it doesn't then make one
    // setter
    else {
        // create the cookie object
        var tCookieObject = {
            uuid: generateUUID()
        };

        // add created property to the user
        updateUserData(tCookieObject.uuid, {created: rightNow, lastVisit: rightNow});

        //  stringify the cookie, set it, then return it
        document.cookie = JSON.stringify(tCookieObject);
        return JSON.parse(document.cookie);
    }
}

/*
Write to the user's DB entry
Parameters: pCookie (the userID cookie), pData (JSON object of data)
Returns: none
 */
function updateUserData (pUUID, pData) {
    gDatabase.ref().child('users/' + pUUID).update(pData);
}