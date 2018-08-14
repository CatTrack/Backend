const admin = require("firebase-admin");
var serviceAccount = require("./servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var userId = "1";
var catId = "0";
var location = "Inside";
var locId = "Bowl";
var cDate = new Date();

var docRef = db.collection('users').doc(userId).collection('Cats').doc(catId);

var dataStuff = docRef.set({
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
}, {merge: true });