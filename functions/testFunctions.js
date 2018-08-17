const request = require("request");
const usernameToID = require("./usernameToID").usernameToID
const getCats = require("./getCats").getCats
const getCatLocation = require("./getCatLocation").getCatLocation

function test(username, catID){
    usernameToID(username, function(err, userID){
        if (err != null){
            console.log(err);
        }
    
        getCats(userID, function(err, cats){
            getCatLocation(userID, catID, function(err, location){
                console.log(username + "'s ID is: " + userID);
                console.log(username + "'s cats are: " + cats);
                console.log(username + "'s general cat location is: " + location);
            });

        });
      });
}

test("Ben", "0")