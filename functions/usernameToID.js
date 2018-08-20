const request = require("request");

module.exports.usernameToID = function(targetUsername, callback){
    let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/";
    request(endpoint, function (error, response, body) {
        body = JSON.parse(body);
        body.documents.forEach(user => {
            let username = user.fields.Username.stringValue;
            if (username == targetUsername) {
                let userID = user.name.split("projects/te-cattrack/databases/(default)/documents/users/")[1];
                callback(null, userID);
            }

        });

    });
}