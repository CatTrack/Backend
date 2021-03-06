// Required libraries
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const request = require("request");
const cors = require('cors')({origin: true});
var serviceAccount = require("./servicekey.json");
var cDate = new Date();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Update cat location
exports.setLoc = functions.https.onRequest((req, res) => {
    var q = req.body;
    var reqres = {
        "userID": q.userID,
        "catID": q.catID,
        "location": q.location,
        "locID": q.locID
    };

    /* admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });*/

    var db = admin.firestore();

    var docRef = db.collection('users').doc(reqres.userID).collection('Cats').doc(reqres.catID);

    var catData = docRef.set({
        "Location": {
            "General Location": reqres.location,
            "Specific Location": [{
                "Specific Location": {
                    "Location Identifier": reqres.locID,
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
    var q = req.body;
    var catData = {
        "Identifier": q.catName,
        "Photo URI": q.photoURI,
        "Location": {
            "General Location": "",
            "Specific Location": [{
                "Specific Location": {
                    "Location Identifier": "",
                    "Timestamps": [cDate]
                }
            }]
        }
    };

    /* admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });*/

    var db = admin.firestore();

    var addDoc = db.collection('users').doc(q.userID).collection('Cats').add(catData).then(ref => {
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
    var q = req.body;
    var catData = {
        "General Location": q.genLoc,
        "Specific Location": q.specLoc
    };

    /* admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });*/
    var db = admin.firestore();

    var addDoc = db.collection('users').doc(q.userID).collection('Locations').add(catData).then(ref => {
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
    var q = req.body;
    /*admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });*/
    var db = admin.firestore();

    var docRef = db.collection('users').doc(q.userID).collection('Cats').doc(q.catID);

    var catData = docRef.set({
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

// Get Cats
exports.listCats = functions.https.onRequest((req, res) => {
    if (req.method === `OPTIONS`) {
        res.set('Access-Control-Allow-Origin', 'https://cat-track.herokuapp.com/')
           .set('Access-Control-Allow-Methods', 'GET, POST')
           .status(200);
           return;
    }    
    var userID = req.query.userID;
    console.log(userID);
    let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/" + userID + "/Cats";
    request(endpoint, function (error, response, body) {
        body = JSON.parse(body);
        console.log(body);
        var cats = [];
        body.documents.forEach(cat => {
            cats.push(cat.fields.Identifier.stringValue);
        });
        res.status(200).send(cats);
        return "200";
    });
});

// Get advanced info
exports.getCatsAdv = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method === `OPTIONS`) {
            res.set('Access-Control-Allow-Origin', 'https://cat-track.herokuapp.com/')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .status(200);
            return;
        }    
        var userID = req.query.userID;
        let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/";
        request(endpoint + userID + "/Cats/" , function (error, response, body) {
            body = JSON.parse(body);
            res.status(200).send(body);
            return "200";
        });

    });
});

// Get cat location
exports.getCatLocation = functions.https.onRequest((req, res) => {
    var userID = req.query.userID;
    var catID = req.query.catID;
    let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/";
    request(endpoint + userID + "/Cats/" + catID, function (error, response, body) {
        body = JSON.parse(body);
        catName = body.fields.Location.mapValue.fields.Identifier.stringValue;
        generalLocation = body.fields.Location.mapValue.fields["General Location"].stringValue;
        specificLocation = body.fields.Location.mapValue.fields["Specific Location"].mapValue;
        res.status(200).send({"General Location":generalLocation, "Specific Location": specificLocation});
        return "200";
    });
});

exports.simpleReturn = functions.https.onRequest((req, res) => {
    var body = req.body;
    res.status(200).send(body.userID);
    return "200";
});