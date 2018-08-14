const admin = require("firebase-admin");
var serviceAccount = require("./servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

var db = admin.firestore();

var userId = "0";
var catId = "0";
var location = "Inside";
var locId = "Bowl";
var cDate = getDateTime();

var docRef = db.collection('users').doc(userId).collection('Cats').doc(catId);

var dataStuff = docRef.set({
  "Identifier": "John",
  "Location": {
      "General Location": location,
      "Specific Location": [
            {
              "Specific Location": {
                  "Location Identifier": locId,
                  "Timestamps": [cDate]
              }
          } 
      ]
  }
});