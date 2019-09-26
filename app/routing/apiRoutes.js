var friendsArray = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
      res.json(friendsArray);
    });
  
    app.post("/api/friends", function(req, res) {
      var closestMatch = {
        name: "",
        photo: "",
        scoreDiff: 1000
      };
      console.log(req.body);

      
      var userData = req.body;
      var userScores = userData.scores;

      console.log(userScores);

      var totalDifference = 0;

      for (i = 0; i < friendsArray.length; i++) {
        console.log(friendsArray[i]);
        totalDifference = 0;
        for (var j = 0; j < friendsArray[i].scores[j]; j++) {
          totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsArray[i].scores[j]));
          if (totalDifference <= closestMatch.scoreDiff) {
            closestMatch.name = friendsArray[i].name;
            closestMatch.photo = friendsArray[i].photo;
            closestMatch.scoreDiff = totalDifference;
          }
        }
      }

      friendsArray.push(userData);
      
      res.json(closestMatch);
    });
    


  };
  