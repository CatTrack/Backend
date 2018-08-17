const request = require("request");

function debugInfo(error, response){
    if (response.statusCode != 200){
        console.log({"statusCode:": (response && response.statusCode)});
    }
    if (error != null){
        console.log({"error:": error});
    }
}


function usernameToID(targetUsername, callback){
    let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/";
    request(endpoint, function (error, response, body) {
        debugInfo(error, response);

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


function getCats(userID, callback){
    let endpoint = "https://firestore.googleapis.com/v1beta1/projects/te-cattrack/databases/(default)/documents/users/";
    request(endpoint + userID + "/Cats", function (error, response, body) {
        debugInfo(error, response)

        body = JSON.parse(body)
        var cats = [];
        body.documents.forEach(cat => {
            cats.push(cat.fields.Identifier.stringValue);
        });
        callback(null, cats);
});
}


function main(username){
  usernameToID(username, function(err, userID){
    if (err != null){
        console.log(err);
    }

    getCats(userID, function(err, cats){
        console.log(username + "'s ID is: " + userID);
        console.log(username + "'s cats are: " + cats);
    });
  });
}

main("Ben");
