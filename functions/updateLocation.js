// Required libraries
const functions = require('firebase-functions');
const admin = require("firebase-admin");
var serviceAccount = require("./servicekey.json");

exports.setLoc = functions.https.onRequest((req, res) => {
    console.log("Fire")
}