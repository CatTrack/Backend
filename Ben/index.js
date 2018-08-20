// Required libraries
const functions = require('firebase-functions');
const admin = require("firebase-admin");
var serviceAccount = require("./servicekey.json");
var cDate = new Date();

// Update cat location
exports.setLoc = functions.https.onRequest((req, res) => {
    var q = req.query;
    var reqres = {
        "userId": q.userId,
        "catId": q.catId,
        "location": q.location,
        "locId": q.locId
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    var db = admin.firestore();

    var docRef = db.collection('users').doc(reqres.userId).collection('Cats').doc(reqres.catId);

    var dataStuff = docRef.set({
        "Location": {
            "General Location": reqres.location,
            "Specific Location": [{
                "Specific Location": {
                    "Location Identifier": reqres.locId,
                    "Timestamps": [cDate]
                }
            }]
        }
    }, {
        merge: true
    });
    var response = {
        "Response Code": 200,
        "Success": true,
        "Additional Info": "None"
    };
    res.status(200).send(response);
    return "200";
});

// New Cat
exports.newCat = functions.https.onRequest((req, res) => {
    var q = req.query;
    var dataStuff = {
        "Identifier": q.catId,
        "Photo URI": q.photoURI,
        "Location": {
            "General Location": q.location,
            "Specific Location": [{
                "Specific Location": {
                    "Location Identifier": q.locId,
                    "Timestamps": [cDate]
                }
            }]
        }
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    var db = admin.firestore();

    var addDoc = db.collection('users').doc(q.userId).collection('Cats').add(dataStuff).then(ref => {
        var response = {
            "Response Code": 201,
            "Success": true,
            "Document ID": ref.id
        };
        res.status(201).send(response);
    });
    return "200";
});

// New User Defined Location
exports.newLoc = functions.https.onRequest((req, res) => {
    var q = req.query;
    var dataStuff = {
        "General Location": q.genLoc,
        "Specific Location": q.specLoc,
        "Identifier": q.locId
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    var db = admin.firestore();

    var addDoc = db.collection('users').doc(q.userId).collection('Locations').add(dataStuff).then(ref => {
        var response = {
            "Response Code": 201,
            "Success": true,
            "Document ID": ref.id
        };
        res.status(201).send(response);
    });
    return "200";
});

// Update cat details
exports.setCat = functions.https.onRequest((req, res) => {
    var q = req.query;
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    var db = admin.firestore();

    var docRef = db.collection('users').doc(q.userId).collection('Cats').doc(q.catId);

    var dataStuff = docRef.set({
        "Identifier": q.catName,
        "Photo URI": q.photoURI
    }, {
        merge: true
    });
    var response = {
        "Response Code": 200,
        "Success": true,
        "Additional Info": "None"
    };
    res.status(200).send(response);
    return "200";
});