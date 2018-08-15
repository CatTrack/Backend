// Required libraries
const functions = require('firebase-functions');
const admin = require("firebase-admin");
var serviceAccount = require("./servicekey.json");

exports.setLoc = functions.https.onRequest((req, res) => {
            const q = req.query;
            var reqres = {
                "userId": q.userId,
                "catId": q.catId,
                "location": q.location,
                "locId": q.locId
            }
            
            var reqstr = JSON.stringify(reqres);

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });

            var db = admin.firestore();

            var cDate = new Date();

            var docRef = db.collection('users').doc(reqres['userId']).collection('Cats').doc(reqres['catId']);

            var dataStuff = docRef.set({
                "Location": {
                    "General Location": reqres['location'],
                    "Specific Location": [{
                        "Specific Location": {
                            "Location Identifier": reqres['locId'],
                            "Timestamps": [cDate]
                        }
                    }]
                }
            }, {
                merge: true
            });
            res.status(200).send("Received: \n "+ JSON.stringify(reqres) );
            return "200";
        });