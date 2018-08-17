const request = require("request");

module.exports.getCats = function(userID, callback){
    let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/";
    request(endpoint + userID + "/Cats", function (error, response, body) {
        body = JSON.parse(body)
        var cats = [];
        body.documents.forEach(cat => {
            cats.push(cat.fields.Identifier.stringValue);
        });
        callback(null, cats);
    });
}
