const request = require("request");

module.exports.getCatLocation = function(userID, catID, callback){
    let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/";
    request(endpoint + userID + "/Cats/" + catID, function (error, response, body) {
        generalLocation = JSON.parse(body).fields.Location.mapValue.fields["General Location"]["stringValue"]
        callback(null, generalLocation);
    });
}
